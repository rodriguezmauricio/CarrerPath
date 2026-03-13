'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTrack } from './tracks';

const STORAGE_KEY = 'career-platform-progress';

interface StoredProgress {
  completedLessons: string[];
  lastVisited: string | null;
  bookmarks: string[];
}

function loadProgress(): StoredProgress {
  if (typeof window === 'undefined') {
    return { completedLessons: [], lastVisited: null, bookmarks: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: [], lastVisited: null, bookmarks: [] };
}

function saveProgress(data: StoredProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Key format: "companyId:roleId:trackId:lessonId" */
export function lessonKey(companyId: string, roleId: string, trackId: string, lessonId: string) {
  return `${companyId}:${roleId}:${trackId}:${lessonId}`;
}

export function useProgress() {
  const [data, setData] = useState<StoredProgress>({
    completedLessons: [],
    lastVisited: null,
    bookmarks: [],
  });

  useEffect(() => {
    setData(loadProgress());
  }, []);

  const persist = useCallback((updated: StoredProgress) => {
    setData(updated);
    saveProgress(updated);
  }, []);

  const markComplete = useCallback(
    (key: string) => {
      if (data.completedLessons.includes(key)) return;
      const updated = {
        ...data,
        completedLessons: [...data.completedLessons, key],
        lastVisited: key,
      };
      persist(updated);
    },
    [data, persist]
  );

  const markIncomplete = useCallback(
    (key: string) => {
      const updated = {
        ...data,
        completedLessons: data.completedLessons.filter((k) => k !== key),
      };
      persist(updated);
    },
    [data, persist]
  );

  const isComplete = useCallback(
    (key: string) => data.completedLessons.includes(key),
    [data.completedLessons]
  );

  const getTrackProgress = useCallback(
    (companyId: string, roleId: string, trackId: string): number => {
      const track = getTrack(trackId);
      if (!track) return 0;
      const totalLessons = track.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
      if (totalLessons === 0) return 0;
      const prefix = `${companyId}:${roleId}:${trackId}:`;
      const completed = data.completedLessons.filter((k) => k.startsWith(prefix)).length;
      return Math.round((completed / totalLessons) * 100);
    },
    [data.completedLessons]
  );

  const getRoleProgress = useCallback(
    (companyId: string, roleId: string, trackIds: string[]): number => {
      let total = 0;
      let completed = 0;
      for (const trackId of trackIds) {
        const track = getTrack(trackId);
        if (!track) continue;
        const lessons = track.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
        total += lessons;
        const prefix = `${companyId}:${roleId}:${trackId}:`;
        completed += data.completedLessons.filter((k) => k.startsWith(prefix)).length;
      }
      if (total === 0) return 0;
      return Math.round((completed / total) * 100);
    },
    [data.completedLessons]
  );

  return {
    completedLessons: data.completedLessons,
    lastVisited: data.lastVisited,
    markComplete,
    markIncomplete,
    isComplete,
    getTrackProgress,
    getRoleProgress,
  };
}
