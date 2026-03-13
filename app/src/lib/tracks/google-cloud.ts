import type { Track } from "../types";

export const googleCloudTrack: Track = {
  id: "google-cloud",
  title: "Google Cloud Platform",
  color: "#4285F4",
  subtitle:
    "Master GCP core services, Vertex AI, BigQuery, Cloud Run, and IAM to architect and support production-grade cloud solutions.",
  icon: "☁️",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  tags: ["gcp", "cloud", "vertex-ai", "bigquery"],
  chapters: [
    // ── Chapter 1: GCP Core Services & IAM ──────────────────────────────
    {
      id: "gcp-core-iam",
      title: "GCP Core Services & IAM",
      lessons: [
        {
          id: "gcp-projects-iam-compute",
          title: "Projects, IAM, and Core Compute with Cloud Run",
          duration: 55,
          type: "Domain",
          bloomLevel: "Apply",
          learningObjectives: [
            "Explain the GCP resource hierarchy (organization → folder → project) and how IAM policies inherit across levels.",
            "Configure IAM bindings using predefined and custom roles to enforce least-privilege access for Cloud Run services.",
            "Deploy and manage a containerized application on Cloud Run, configuring concurrency, scaling limits, and VPC connectors.",
          ],
          why: "As a Google Cloud support engineer or architect, nearly every customer escalation begins with understanding which project a resource lives in and whether IAM is configured correctly. Misconfigured IAM bindings are the number-one root cause of 'permission denied' tickets, and Cloud Run is the fastest-growing compute surface—meaning you will encounter it daily.",
          mentalModel:
            "Think of a GCP project as a walled garden: every resource inside shares the same billing account and IAM namespace. IAM policies are like gates in the wall—each gate has a lock (role) that only certain keys (members) can open. Policies set at the organization or folder level cascade downward like water flowing through nested containers, so a role granted at the folder level automatically applies to every project beneath it.",
          commonMisconceptions: [
            {
              wrong:
                "Granting 'Editor' on the project is a safe default for developers who need to deploy Cloud Run services.",
              why: "The Editor role includes thousands of permissions across every GCP service, far exceeding what is needed for Cloud Run deployments. It can modify IAM policies, delete databases, and access secrets—violating the principle of least privilege.",
              correct:
                "Grant the 'Cloud Run Developer' role (roles/run.developer) scoped to the specific project, and add 'Service Account User' (roles/iam.serviceAccountUser) only on the runtime service account the service needs.",
              codeExample: `# Grant least-privilege Cloud Run deploy access
gcloud projects add-iam-policy-binding my-project \\
  --member="user:dev@example.com" \\
  --role="roles/run.developer"

# Allow the developer to act as the runtime SA
gcloud iam service-accounts add-iam-policy-binding \\
  cloudrun-sa@my-project.iam.gserviceaccount.com \\
  --member="user:dev@example.com" \\
  --role="roles/iam.serviceAccountUser"`,
            },
            {
              wrong:
                "Cloud Run automatically scales to zero so there is never any cost when no traffic is flowing.",
              why: "While Cloud Run can scale to zero instances, minimum instance settings, always-on CPU allocation, and VPC connectors with reserved IP ranges can all incur costs even with zero requests. Customers frequently enable min-instances for latency reasons and then are surprised by the bill.",
              correct:
                "Cloud Run scales to zero only when min-instances is 0 and CPU is allocated only during request processing. Always audit the service configuration and the attached VPC connector's subnet to understand the full cost picture.",
              codeExample: `# Check current min-instances setting
gcloud run services describe my-svc --region=us-central1 \\
  --format="value(spec.template.metadata.annotations['autoscaling.knative.dev/minScale'])"

# Set min-instances to 0 to allow scale-to-zero
gcloud run services update my-svc --region=us-central1 \\
  --min-instances=0`,
            },
          ],
          concepts: [
            {
              title: "GCP Resource Hierarchy and IAM Policy Inheritance",
              explanation:
                "GCP organizes resources in a hierarchy: Organization → Folders → Projects → Resources. IAM policies can be set at any level and are inherited by all children. A policy binding associates a member (user, group, or service account) with a role (a collection of permissions). When evaluating access, GCP computes the effective policy by unioning all bindings from the resource itself up to the organization. Deny policies, evaluated before allow policies, can override inherited grants. Understanding this inheritance model is critical for diagnosing 'permission denied' errors—often the permission exists at the wrong level, or a deny policy at a higher level blocks it.",
              example:
                "A customer opens a ticket: 'My Cloud Run deployment fails with PERMISSION_DENIED.' You check the project-level IAM and see the developer has roles/run.developer. The issue: the service uses a cross-project Artifact Registry image, and the Cloud Run service agent lacks roles/artifactregistry.reader on the other project. The fix is adding the binding at the correct project level.",
              codeSnippet: `# List effective IAM policy for a project (shows inherited bindings)
gcloud projects get-iam-policy my-project --format=json | \\
  jq '.bindings[] | select(.role | contains("run"))'

# Grant Cloud Run service agent access to cross-project Artifact Registry
gcloud projects add-iam-policy-binding artifact-project \\
  --member="serviceAccount:service-12345@serverless-robot-prod.iam.gserviceaccount.com" \\
  --role="roles/artifactregistry.reader"

# Deploy a Cloud Run service with explicit service account and scaling
gcloud run deploy my-api \\
  --image=us-central1-docker.pkg.dev/artifact-project/repo/my-api:latest \\
  --region=us-central1 \\
  --service-account=cloudrun-sa@my-project.iam.gserviceaccount.com \\
  --min-instances=1 \\
  --max-instances=10 \\
  --concurrency=80 \\
  --cpu=2 \\
  --memory=1Gi \\
  --vpc-connector=my-connector \\
  --allow-unauthenticated`,
            },
          ],
          miniExercises: [
            {
              id: "gcp-projects-iam-compute-m1",
              title: "Diagnose an IAM Inheritance Issue",
              question:
                "A developer has roles/run.developer on folder 'Engineering' but cannot deploy to a project under that folder. The deploy fails with PERMISSION_DENIED on the Artifact Registry image. What is the most likely cause and how do you fix it?",
              steps: [
                {
                  instruction:
                    "List the IAM bindings on the Artifact Registry project to check whether the developer or the Cloud Run service agent has read access.",
                  example:
                    "gcloud projects get-iam-policy ar-project --flatten='bindings[].members' --filter='bindings.role:artifactregistry'",
                  hint: "Cloud Run uses a per-project service agent (service-<PROJECT_NUMBER>@serverless-robot-prod.iam.gserviceaccount.com) to pull images. This agent needs artifactregistry.reader on the AR project.",
                },
                {
                  instruction:
                    "Grant the Cloud Run service agent the required role on the Artifact Registry project.",
                  example:
                    "gcloud projects add-iam-policy-binding ar-project --member='serviceAccount:service-12345@serverless-robot-prod.iam.gserviceaccount.com' --role='roles/artifactregistry.reader'",
                },
                {
                  instruction:
                    "Re-deploy the service and confirm the image is pulled successfully.",
                  example:
                    "gcloud run deploy my-api --image=us-central1-docker.pkg.dev/ar-project/repo/my-api:latest --region=us-central1",
                },
              ],
              solution:
                "The Cloud Run service agent in the developer's project does not have roles/artifactregistry.reader on the Artifact Registry project. Even though the developer has run.developer via folder inheritance, the service agent is a separate identity that requires its own cross-project binding.",
              explanation:
                "IAM inheritance applies to the member it is bound to. The developer inherits run.developer from the folder, but the Cloud Run service agent is a Google-managed service account scoped to the developer's project—it has no automatic access to other projects. You must explicitly grant it read access on the AR project.",
            },
            {
              id: "gcp-projects-iam-compute-m2",
              title: "Configure Cloud Run Scaling and Concurrency",
              question:
                "A customer reports that their Cloud Run service experiences cold starts during off-peak hours but costs are too high during peak. How do you configure scaling to balance latency and cost?",
              steps: [
                {
                  instruction:
                    "Check the current scaling configuration of the service.",
                  example:
                    "gcloud run services describe my-svc --region=us-central1 --format='yaml(spec.template.metadata.annotations)'",
                  hint: "Look for autoscaling.knative.dev/minScale and maxScale annotations.",
                },
                {
                  instruction:
                    "Set min-instances to 1 to keep a warm instance available, and max-instances to a cost-appropriate ceiling.",
                  example:
                    "gcloud run services update my-svc --region=us-central1 --min-instances=1 --max-instances=20 --concurrency=100",
                },
                {
                  instruction:
                    "Switch CPU allocation to 'request processing only' to avoid paying for idle CPU on the min instance.",
                  example:
                    "gcloud run services update my-svc --region=us-central1 --no-cpu-throttling=false",
                  hint: "The --cpu-throttling flag (default) means CPU is allocated only during request processing, reducing cost for idle warm instances.",
                },
              ],
              solution:
                "Set --min-instances=1 to eliminate cold starts, --max-instances=20 to cap costs, --concurrency=100 to maximize utilization per instance, and ensure CPU is allocated only during request processing (the default) so the warm instance costs less when idle.",
              explanation:
                "Min-instances keeps warm containers ready but incurs cost for the memory they reserve. By using request-based CPU allocation (the default), you pay for CPU only when the instance is actually handling a request, which significantly reduces the cost of warm-but-idle instances.",
            },
            {
              id: "gcp-projects-iam-compute-m3",
              title: "Create a Custom IAM Role",
              question:
                "Your security team requires that Cloud Run developers can deploy services but cannot delete them or modify IAM. Create a custom role that satisfies this requirement.",
              steps: [
                {
                  instruction:
                    "List the permissions included in the predefined roles/run.developer role to identify which ones to exclude.",
                  example:
                    "gcloud iam roles describe roles/run.developer --format='value(includedPermissions)' | tr ';' '\\n' | sort",
                  hint: "Look for run.services.delete and any iam-related permissions.",
                },
                {
                  instruction:
                    "Create a YAML file defining the custom role with the desired permissions.",
                  example: `cat > custom-run-deployer.yaml << 'YAML'
title: "Cloud Run Deployer (No Delete)"
description: "Can deploy and update Cloud Run services but cannot delete them."
stage: "GA"
includedPermissions:
  - run.services.create
  - run.services.get
  - run.services.list
  - run.services.update
  - run.revisions.get
  - run.revisions.list
  - run.configurations.get
  - run.configurations.list
  - run.routes.get
  - run.routes.list
YAML`,
                },
                {
                  instruction: "Create the custom role at the project level.",
                  example:
                    "gcloud iam roles create customRunDeployer --project=my-project --file=custom-run-deployer.yaml",
                },
              ],
              solution:
                "Create a custom role containing only the run.services.create, run.services.update, run.services.get, and run.services.list permissions (plus related revision/config/route read permissions), explicitly excluding run.services.delete and any setIamPolicy permissions.",
              explanation:
                "Custom roles let you follow least-privilege precisely. The predefined run.developer role includes run.services.delete and run.services.setIamPolicy, which your security team wants to restrict. By creating a custom role, you grant exactly the permissions needed for deployment without the ability to delete services or modify their IAM policies.",
            },
          ],
          resources: [
            {
              label: "GCP IAM Overview and Resource Hierarchy",
              url: "https://cloud.google.com/iam/docs/overview",
            },
            {
              label: "Cloud Run Developer Guide",
              url: "https://cloud.google.com/run/docs/deploying",
            },
          ],
          whyItMatters:
            "A solid grasp of the GCP resource hierarchy and IAM model lets you resolve permission-related escalations in minutes rather than hours. Combined with Cloud Run expertise, you can confidently guide customers through deployments, cost optimization, and security hardening—the three most common themes in GCP support tickets.",
        },
      ],
      review: {
        id: "gcp-core-iam-review",
        type: "ChapterReview",
        coversLessons: ["gcp-projects-iam-compute"],
        questions: [
          {
            prompt:
              "A service account has roles/editor at the organization level but a deny policy at the project level denies storage.objects.delete. Can the service account delete objects in a bucket within that project? Explain why.",
            expectedAnswer:
              "No. Deny policies are evaluated before allow policies. Even though roles/editor grants storage.objects.delete and is inherited from the organization, the deny policy at the project level explicitly blocks that permission, so the delete call is rejected.",
            bloomLevel: "Analyze",
            relatedLessonId: "gcp-projects-iam-compute",
          },
          {
            prompt:
              "You need a Cloud Run service in project A to read from a Cloud SQL instance in project B using a private IP. What networking and IAM configurations are required?",
            expectedAnswer:
              "Networking: Create a Serverless VPC Access connector in project A connected to a VPC that is peered (or uses Shared VPC) with the VPC hosting Cloud SQL in project B. Configure the Cloud Run service with --vpc-connector and --vpc-egress=private-ranges-only. IAM: Grant the Cloud Run service's runtime service account the roles/cloudsql.client role on project B. Ensure the Cloud SQL instance has a private IP and the firewall rules allow traffic from the connector's subnet.",
            bloomLevel: "Apply",
            relatedLessonId: "gcp-projects-iam-compute",
          },
          {
            prompt:
              "Explain the difference between the Cloud Run 'service agent' and the 'runtime service account', and describe a scenario where misconfiguring one versus the other leads to different errors.",
            expectedAnswer:
              "The service agent (service-<PROJECT_NUMBER>@serverless-robot-prod.iam.gserviceaccount.com) is a Google-managed account that performs control-plane operations like pulling container images from Artifact Registry. The runtime service account is the identity the running container uses to call GCP APIs. If the service agent lacks AR reader permissions, the deployment fails with an image pull error. If the runtime service account lacks, say, storage.objectViewer, the deployment succeeds but the running application gets PERMISSION_DENIED when it tries to read from GCS.",
            bloomLevel: "Analyze",
            relatedLessonId: "gcp-projects-iam-compute",
          },
        ],
      },
    },

    // ── Chapter 2: Vertex AI & BigQuery ─────────────────────────────────
    {
      id: "vertex-ai-bigquery",
      title: "Vertex AI & BigQuery",
      lessons: [
        {
          id: "vertex-bigquery-ml-pipelines",
          title: "Vertex AI, BigQuery ML, and End-to-End ML Pipelines",
          duration: 60,
          type: "Domain",
          bloomLevel: "Apply",
          prerequisites: ["gcp-projects-iam-compute"],
          learningObjectives: [
            "Deploy a model to a Vertex AI endpoint with traffic splitting and autoscaling, and troubleshoot prediction request failures.",
            "Write BigQuery SQL that creates, evaluates, and generates predictions from a BigQuery ML model, understanding when to use BQML versus Vertex AI custom training.",
            "Construct a Vertex AI Pipeline using the KFP SDK that orchestrates data extraction from BigQuery, model training, evaluation, and conditional deployment.",
          ],
          why: "Google Cloud customers increasingly adopt Vertex AI and BigQuery ML for production machine learning. As a support engineer or architect, you will triage model deployment failures, debug prediction latency issues, optimize BigQuery ML training costs, and help customers design reliable ML pipelines. Understanding the interplay between BigQuery (data), Vertex AI (training/serving), and Pipelines (orchestration) lets you diagnose issues that span multiple services.",
          mentalModel:
            "Think of an ML workflow as a factory assembly line. BigQuery is the warehouse where raw materials (data) are stored and preprocessed. Vertex AI Training is the manufacturing floor where models are built. Vertex AI Endpoints are the shipping dock where finished products (predictions) are dispatched to customers. Vertex AI Pipelines is the factory manager coordinating the entire process, deciding when to move materials between stations and whether quality control (evaluation) passes before shipping.",
          commonMisconceptions: [
            {
              wrong:
                "BigQuery ML models are only useful for prototyping and should always be retrained in Vertex AI for production.",
              why: "BigQuery ML supports production-grade models including boosted trees, ARIMA+, matrix factorization, and imported TensorFlow models. For structured data workloads, BQML models can be trained, evaluated, and serve predictions entirely within BigQuery—avoiding data movement and reducing infrastructure complexity. They can also be exported to Vertex AI Model Registry for online serving.",
              correct:
                "Use BigQuery ML when your data is already in BigQuery, your model type is supported, and batch predictions or SQL-based inference is acceptable. Export to Vertex AI endpoints when you need low-latency online predictions or custom serving containers.",
              codeExample: `-- Train a boosted tree classifier directly in BigQuery
CREATE OR REPLACE MODEL \`my_project.ml_dataset.churn_model\`
OPTIONS(
  model_type='BOOSTED_TREE_CLASSIFIER',
  input_label_cols=['churned'],
  data_split_method='AUTO_SPLIT',
  max_iterations=50,
  learn_rate=0.1
) AS
SELECT * EXCEPT(customer_id)
FROM \`my_project.ml_dataset.customer_features\`;

-- Evaluate the model
SELECT * FROM ML.EVALUATE(MODEL \`my_project.ml_dataset.churn_model\`);

-- Export to Vertex AI Model Registry
EXPORT MODEL \`my_project.ml_dataset.churn_model\`
OPTIONS(uri='gs://my-bucket/exported-models/churn/');`,
            },
            {
              wrong:
                "Vertex AI Pipelines require Kubeflow Pipelines infrastructure to be managed by the customer.",
              why: "Vertex AI Pipelines is a fully managed, serverless service. Customers do not provision or manage any Kubernetes clusters. The service compiles KFP v2 pipeline definitions and executes them on Google-managed infrastructure. Confusing it with self-managed Kubeflow on GKE is common and leads customers to over-provision infrastructure.",
              correct:
                "Vertex AI Pipelines is serverless. You define pipelines using the KFP SDK v2, compile them to JSON, and submit them to the Vertex AI API. Google manages all execution infrastructure. The customer only pays per pipeline step execution time.",
              codeExample: `from kfp.v2 import dsl, compiler
from google.cloud import aiplatform

@dsl.pipeline(name="training-pipeline", pipeline_root="gs://my-bucket/pipelines")
def training_pipeline(project: str, region: str):
    from google_cloud_pipeline_components.v1.bigquery import BigqueryQueryJobOp
    from google_cloud_pipeline_components.v1.vertex_ai import ModelUploadOp

    extract_data = BigqueryQueryJobOp(
        project=project,
        location=region,
        query="SELECT * FROM \`ml_dataset.training_data\`",
    )
    # ... additional steps

# Compile and submit — no Kubernetes cluster needed
compiler.Compiler().compile(pipeline_func=training_pipeline, package_path="pipeline.json")
aiplatform.PipelineJob(
    display_name="weekly-training",
    template_path="pipeline.json",
    parameter_values={"project": "my-project", "region": "us-central1"},
).run(service_account="pipeline-sa@my-project.iam.gserviceaccount.com")`,
            },
          ],
          concepts: [
            {
              title:
                "Vertex AI Model Deployment and BigQuery ML Integration",
              explanation:
                "Vertex AI Endpoints provide online prediction serving with features like traffic splitting (A/B testing between model versions), autoscaling based on CPU/GPU utilization or request rate, and private endpoints for VPC-internal traffic. A model is first uploaded to the Vertex AI Model Registry (from GCS artifacts, BigQuery ML export, or a custom container image), then deployed to one or more endpoints. Each deployment specifies machine type, accelerator, min/max replicas, and traffic percentage. BigQuery ML complements this by enabling SQL-based model training and batch prediction directly on warehouse data. Models trained in BQML can be exported and registered in Vertex AI for online serving, creating a bridge between the data analytics and ML serving worlds. When troubleshooting, the most common issues are: (1) the serving container crashes due to mismatched model artifact format, (2) IAM on the model artifacts bucket blocks the Vertex AI service agent, and (3) autoscaling is too slow for bursty traffic because min replicas is set to zero.",
              example:
                "A customer exports a BigQuery ML boosted-tree model to GCS, uploads it to Vertex AI Model Registry, and deploys it to an endpoint. Initial traffic goes to model v1 (90%) and the new v2 (10%). After validating that v2 has lower latency and equivalent accuracy via Vertex AI Model Monitoring, they shift 100% traffic to v2 and undeploy v1—all without downtime.",
              codeSnippet: `from google.cloud import aiplatform

aiplatform.init(project="my-project", location="us-central1")

# Upload a model exported from BigQuery ML
model = aiplatform.Model.upload(
    display_name="churn-predictor-v2",
    artifact_uri="gs://my-bucket/exported-models/churn/",
    serving_container_image_uri="us-docker.pkg.dev/vertex-ai/prediction/tf2-cpu.2-12:latest",
)

# Create or reuse an endpoint
endpoint = aiplatform.Endpoint.create(display_name="churn-endpoint")

# Deploy with traffic split: 90% to existing, 10% to new
endpoint.deploy(
    model=model,
    deployed_model_display_name="churn-v2",
    machine_type="n1-standard-4",
    min_replica_count=1,
    max_replica_count=5,
    traffic_percentage=10,  # 10% canary
)

# Test a prediction
prediction = endpoint.predict(instances=[
    {"tenure": 24, "monthly_charges": 65.5, "contract": "Month-to-month"}
])
print(prediction.predictions)

# Once validated, shift all traffic to v2
endpoint.deploy(
    model=model,
    deployed_model_display_name="churn-v2",
    machine_type="n1-standard-4",
    min_replica_count=2,
    max_replica_count=10,
    traffic_percentage=100,
)`,
            },
          ],
          miniExercises: [
            {
              id: "vertex-bigquery-ml-pipelines-m1",
              title: "Train and Evaluate a BigQuery ML Model",
              question:
                "A customer wants to predict customer churn using data in BigQuery. Walk them through creating a BQML model, evaluating it, and generating batch predictions.",
              steps: [
                {
                  instruction:
                    "Write the CREATE MODEL SQL statement for a boosted tree classifier with appropriate options.",
                  example: `CREATE OR REPLACE MODEL \`project.dataset.churn_model\`
OPTIONS(
  model_type='BOOSTED_TREE_CLASSIFIER',
  input_label_cols=['churned'],
  data_split_method='AUTO_SPLIT',
  max_iterations=50
) AS
SELECT * EXCEPT(customer_id)
FROM \`project.dataset.customer_features\`;`,
                  hint: "Use BOOSTED_TREE_CLASSIFIER for binary classification. Exclude the primary key column from training features.",
                },
                {
                  instruction:
                    "Evaluate the model using ML.EVALUATE and interpret the key metrics.",
                  example:
                    "SELECT * FROM ML.EVALUATE(MODEL `project.dataset.churn_model`);",
                  hint: "Key metrics: precision, recall, accuracy, f1_score, log_loss, roc_auc. For churn prediction, recall is often prioritized over precision.",
                },
                {
                  instruction:
                    "Generate batch predictions on a holdout dataset using ML.PREDICT.",
                  example: `SELECT customer_id, predicted_churned, predicted_churned_probs
FROM ML.PREDICT(
  MODEL \`project.dataset.churn_model\`,
  (SELECT * FROM \`project.dataset.holdout_customers\`)
);`,
                  hint: "ML.PREDICT returns the predicted label and probability array. You can filter on probability thresholds for business rules.",
                },
              ],
              solution:
                "Create the model with CREATE OR REPLACE MODEL using BOOSTED_TREE_CLASSIFIER, evaluate with ML.EVALUATE to check roc_auc and recall, then batch predict with ML.PREDICT joining back to the customer_id for actionable results.",
              explanation:
                "BigQuery ML enables the full train-evaluate-predict cycle without moving data out of BigQuery. This is ideal for customers who want rapid iteration on structured data models without managing ML infrastructure. The model training is billed as a BigQuery job at on-demand or flat-rate pricing.",
            },
            {
              id: "vertex-bigquery-ml-pipelines-m2",
              title: "Troubleshoot a Failed Vertex AI Deployment",
              question:
                "A customer reports that deploying a model to a Vertex AI endpoint fails with 'Model server failed to start'. What diagnostic steps would you take?",
              steps: [
                {
                  instruction:
                    "Check the deployment logs for the specific deployed model in the endpoint.",
                  example: `gcloud ai endpoints describe ENDPOINT_ID \\
  --region=us-central1 \\
  --format='yaml(deployedModels)'

# Check prediction container logs
gcloud logging read 'resource.type="aiplatform.googleapis.com/Endpoint" AND resource.labels.endpoint_id="ENDPOINT_ID"' \\
  --limit=50 --format=json`,
                  hint: "The container logs usually reveal whether the issue is a missing model artifact, incompatible framework version, or out-of-memory error.",
                },
                {
                  instruction:
                    "Verify the model artifact URI is accessible by the Vertex AI service agent.",
                  example: `# Check the model's artifact URI
gcloud ai models describe MODEL_ID --region=us-central1 --format='value(artifactUri)'

# Verify service agent has access
gsutil iam get gs://my-bucket/exported-models/ | grep vertex`,
                  hint: "The Vertex AI service agent (service-PROJECT_NUM@gcp-sa-aiplatform.iam.gserviceaccount.com) needs roles/storage.objectViewer on the artifact bucket.",
                },
                {
                  instruction:
                    "Confirm the serving container image matches the model framework and version.",
                  example:
                    "gcloud ai models describe MODEL_ID --region=us-central1 --format='value(containerSpec.imageUri)'",
                  hint: "A TensorFlow 2.12 model served by a TF 2.8 container will often fail with cryptic deserialization errors.",
                },
              ],
              solution:
                "Check container logs for startup errors, verify the service agent has GCS read access to the model artifacts, and confirm the serving container image version matches the framework version used to train the model. The most common fix is granting storage.objectViewer to the Vertex AI service agent or updating the container image URI.",
              explanation:
                "Model deployment failures on Vertex AI almost always fall into three categories: IAM/access issues on the model artifacts, framework version mismatches between training and serving, or resource limits (the container OOMs on startup). Checking logs first narrows the diagnosis quickly.",
            },
            {
              id: "vertex-bigquery-ml-pipelines-m3",
              title: "Build a Vertex AI Pipeline",
              question:
                "Design a Vertex AI Pipeline that extracts data from BigQuery, trains a model, evaluates it, and conditionally deploys it only if the evaluation metric exceeds a threshold.",
              steps: [
                {
                  instruction:
                    "Define the pipeline structure using KFP v2 decorators, including a conditional deployment step.",
                  example: `from kfp.v2 import dsl

@dsl.pipeline(name="churn-pipeline", pipeline_root="gs://bucket/pipelines")
def churn_pipeline(project: str, threshold: float = 0.85):
    extract = extract_data_op(project=project)
    train = train_model_op(data=extract.outputs["dataset"])
    evaluate = evaluate_model_op(model=train.outputs["model"])
    with dsl.Condition(evaluate.outputs["roc_auc"] > threshold):
        deploy_model_op(model=train.outputs["model"])`,
                  hint: "Use dsl.Condition for the conditional deployment gate. Pipeline parameters let you adjust the threshold without recompiling.",
                },
                {
                  instruction:
                    "Compile the pipeline and submit it to Vertex AI.",
                  example: `from kfp.v2 import compiler
from google.cloud import aiplatform

compiler.Compiler().compile(pipeline_func=churn_pipeline, package_path="pipeline.json")
job = aiplatform.PipelineJob(
    display_name="churn-weekly",
    template_path="pipeline.json",
    parameter_values={"project": "my-project", "threshold": 0.85},
    enable_caching=True,
)
job.run(service_account="pipeline-sa@my-project.iam.gserviceaccount.com")`,
                  hint: "Enable caching to skip unchanged steps on re-runs, saving cost. The service account needs permissions for BigQuery, Vertex AI, and GCS.",
                },
                {
                  instruction:
                    "Schedule the pipeline to run weekly using Vertex AI Pipeline Schedules.",
                  example: `from google.cloud import aiplatform

schedule = aiplatform.PipelineJobSchedule(
    pipeline_job=job,
    display_name="churn-weekly-schedule",
)
schedule.create(cron="0 2 * * 1", max_concurrent_run_count=1)`,
                  hint: "The cron expression '0 2 * * 1' means every Monday at 2:00 AM UTC.",
                },
              ],
              solution:
                "Define a KFP v2 pipeline with extract → train → evaluate → conditional deploy steps. Use dsl.Condition to gate deployment on a metric threshold. Compile to JSON, submit via aiplatform.PipelineJob with a dedicated service account, and schedule weekly execution.",
              explanation:
                "Vertex AI Pipelines orchestrate multi-step ML workflows serverlessly. The conditional deployment step ensures only models that meet quality thresholds reach production, implementing a basic continuous training (CT) pattern. Caching avoids re-executing unchanged steps, and scheduling automates the entire workflow.",
            },
          ],
          resources: [
            {
              label: "Vertex AI Model Deployment and Prediction",
              url: "https://cloud.google.com/vertex-ai/docs/predictions/deploy-model-api",
            },
            {
              label: "BigQuery ML Documentation",
              url: "https://cloud.google.com/bigquery/docs/bqml-introduction",
            },
          ],
          whyItMatters:
            "Vertex AI and BigQuery ML are the core of Google Cloud's AI platform offering. Customers rely on support engineers to diagnose deployment failures, optimize serving costs, debug pipeline orchestration, and advise on when to use BQML versus custom Vertex AI training. Mastering these services positions you to handle the highest-impact and most technically challenging ML-related escalations.",
        },
      ],
      review: {
        id: "vertex-ai-bigquery-review",
        type: "ChapterReview",
        coversLessons: ["vertex-bigquery-ml-pipelines"],
        questions: [
          {
            prompt:
              "A customer's Vertex AI endpoint serves predictions with a p99 latency of 2 seconds, but their SLA requires under 500ms. The model is a TensorFlow SavedModel (~200MB). What steps would you recommend to reduce latency?",
            expectedAnswer:
              "1) Increase min replicas to avoid cold starts (the dominant latency source). 2) Switch to a GPU-backed machine type if the model benefits from GPU inference. 3) Optimize the model with TF-TRT or quantization to reduce inference time. 4) Use a smaller machine type with more replicas for better horizontal scaling. 5) Enable request batching if the traffic pattern allows it. 6) Consider model distillation to reduce model size. 7) Check if the serving container version supports optimized TF Serving features.",
            bloomLevel: "Evaluate",
            relatedLessonId: "vertex-bigquery-ml-pipelines",
          },
          {
            prompt:
              "When would you recommend a customer use BigQuery ML's ML.PREDICT for batch predictions instead of deploying to a Vertex AI endpoint?",
            expectedAnswer:
              "Use BQML ML.PREDICT when: (1) the prediction data is already in BigQuery, avoiding data export/import costs; (2) batch predictions are sufficient (no real-time latency requirement); (3) the model type is supported by BQML; (4) the customer wants to embed predictions into SQL-based dashboards or ETL pipelines; (5) they want to minimize infrastructure management. Use Vertex AI endpoints when low-latency online prediction is required, the model needs a custom serving container, or traffic requires autoscaling and canary deployments.",
            bloomLevel: "Evaluate",
            relatedLessonId: "vertex-bigquery-ml-pipelines",
          },
          {
            prompt:
              "A Vertex AI Pipeline fails at the training step with 'Permission denied on resource project my-project'. The pipeline service account has roles/aiplatform.user. What is likely missing?",
            expectedAnswer:
              "roles/aiplatform.user allows creating and managing Vertex AI resources, but the training step likely needs additional permissions: roles/bigquery.dataViewer and roles/bigquery.jobUser to read training data from BigQuery, roles/storage.objectAdmin on the pipeline root GCS bucket to write model artifacts, and potentially roles/iam.serviceAccountUser if the training job uses a different service account. The 'Permission denied on resource project' error often indicates the SA lacks project-level resource access rather than Vertex AI-specific permissions.",
            bloomLevel: "Analyze",
            relatedLessonId: "vertex-bigquery-ml-pipelines",
          },
        ],
      },
    },
  ],
};
