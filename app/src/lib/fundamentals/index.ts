import { FundamentalsCourse } from '../types';

export const pythonFundamentals: FundamentalsCourse = {
  id: 'python',
  title: 'Python Fundamentals',
  icon: '🐍',
  color: '#3776AB',
  description: 'Learn Python from scratch — variables, data types, functions, classes, file I/O, and package management. The most popular language for backend development, scripting, and AI/ML.',
  topics: [
    'Variables, data types & operators',
    'Control flow (if/else, loops)',
    'Functions & scope',
    'Lists, dicts, sets & tuples',
    'String manipulation & f-strings',
    'Classes & OOP basics',
    'File I/O & JSON handling',
    'Error handling (try/except)',
    'Modules & pip packages',
    'Virtual environments',
    'List comprehensions & generators',
    'Type hints basics',
  ],
};

export const javascriptFundamentals: FundamentalsCourse = {
  id: 'javascript',
  title: 'JavaScript Fundamentals',
  icon: '⚡',
  color: '#F7DF1E',
  description: 'Master JavaScript essentials — variables, functions, async/await, DOM manipulation, and modern ES6+ features. The language of the web and increasingly the backend.',
  topics: [
    'Variables (let, const, var)',
    'Data types & type coercion',
    'Functions, arrow functions & closures',
    'Objects & arrays',
    'Destructuring & spread operator',
    'Promises & async/await',
    'Template literals & string methods',
    'Array methods (map, filter, reduce)',
    'Classes & prototypes',
    'Modules (import/export)',
    'Error handling (try/catch)',
    'Fetch API & HTTP requests',
  ],
};

export const sqlFundamentals: FundamentalsCourse = {
  id: 'sql',
  title: 'SQL Fundamentals',
  icon: '🗄️',
  color: '#336791',
  description: 'Learn SQL from the ground up — querying, filtering, joining tables, aggregations, and basic database design. Essential for any technical role.',
  topics: [
    'SELECT, FROM, WHERE basics',
    'Filtering with AND, OR, IN, BETWEEN',
    'Sorting & limiting results',
    'JOIN types (INNER, LEFT, RIGHT, FULL)',
    'GROUP BY & aggregate functions',
    'HAVING clause',
    'Subqueries & CTEs',
    'INSERT, UPDATE, DELETE',
    'CREATE TABLE & data types',
    'Primary keys & foreign keys',
    'Indexes & performance basics',
    'NULL handling (IS NULL, COALESCE)',
  ],
};

export const bashFundamentals: FundamentalsCourse = {
  id: 'bash',
  title: 'Bash & CLI Fundamentals',
  icon: '💻',
  color: '#4EAA25',
  description: 'Get comfortable with the command line — file navigation, text processing, scripting, and essential tools every developer uses daily.',
  topics: [
    'Navigating the filesystem (cd, ls, pwd)',
    'File operations (cp, mv, rm, mkdir)',
    'Viewing files (cat, head, tail, less)',
    'Text search with grep',
    'Pipes & redirection (|, >, >>)',
    'Environment variables & PATH',
    'Permissions (chmod, chown)',
    'Process management (ps, kill, top)',
    'Shell scripting basics',
    'curl for HTTP requests',
    'SSH basics',
    'Package managers (apt, brew)',
  ],
};

export const gitFundamentals: FundamentalsCourse = {
  id: 'git',
  title: 'Git Fundamentals',
  icon: '🔀',
  color: '#F05032',
  description: 'Master version control with Git — commits, branches, merging, pull requests, and collaboration workflows used by every development team.',
  topics: [
    'git init, clone & config',
    'Staging & committing (add, commit)',
    'Viewing history (log, diff, show)',
    'Branching & switching (branch, checkout)',
    'Merging & resolving conflicts',
    'Remote repositories (push, pull, fetch)',
    'Pull requests & code review',
    'Stashing changes',
    'Reverting & resetting',
    '.gitignore patterns',
    'Rebasing basics',
    'Git workflows (feature branch, trunk-based)',
  ],
};

export const allFundamentals: FundamentalsCourse[] = [
  pythonFundamentals,
  javascriptFundamentals,
  sqlFundamentals,
  bashFundamentals,
  gitFundamentals,
];

export const fundamentalsRegistry = new Map<string, FundamentalsCourse>(
  allFundamentals.map((c) => [c.id, c])
);

export function getFundamentals(id: string): FundamentalsCourse | undefined {
  return fundamentalsRegistry.get(id);
}
