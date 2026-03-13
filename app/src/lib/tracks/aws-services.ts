import { Track } from "../types";

export const awsServicesTrack: Track = {
  id: "aws-services",
  title: "AWS Core Services & Architecture",
  color: "#FF9900",
  subtitle:
    "Mastering AWS's cloud services ecosystem -- from IAM policies and serverless compute to infrastructure as code and network design",
  icon: "☁️",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  tags: ["aws", "cloud", "lambda", "iam"],
  chapters: [
    {
      id: "aws-ch1",
      title: "Chapter 1 -- IAM & Core Compute",
      lessons: [
        {
          id: "aws-1-1",
          title: "IAM Policies, EC2 Instances & Lambda Functions",
          duration: 60,
          type: "Concept",
          bloomLevel: "Analyze",
          learningObjectives: [
            "Author least-privilege IAM policies using the policy JSON grammar and validate them with the IAM Policy Simulator",
            "Compare EC2 and Lambda execution models to recommend the appropriate compute service for a given workload",
            "Diagnose common IAM permission errors by interpreting Access Denied responses and CloudTrail logs",
          ],
          commonMisconceptions: [
            {
              wrong:
                "Attaching AdministratorAccess to a Lambda execution role is fine for development because it's only temporary",
              why:
                "Developers want to move fast and assume they'll tighten permissions later, but overly permissive roles in dev often leak into production through CI/CD pipelines",
              correct:
                "Always start with the minimum permissions required. Use IAM Access Analyzer to generate a policy scoped to the actions your function actually calls, then attach that policy from day one.",
              codeExample:
                '# BAD: Over-permissive role\n{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Action": "*",\n    "Resource": "*"\n  }]\n}\n\n# GOOD: Least-privilege policy for a Lambda that reads from S3\n{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Action": ["s3:GetObject"],\n    "Resource": "arn:aws:s3:::my-data-bucket/*"\n  }]\n}',
            },
            {
              wrong:
                "An EC2 instance's security group and its IAM role do the same thing -- they both control access",
              why:
                "Both concepts involve 'allowing' or 'denying' things, so beginners conflate network-level access control with API-level permissions",
              correct:
                "Security groups are network firewalls that control inbound/outbound traffic at the IP and port level. IAM roles control which AWS API calls the instance can make. A server needs both: a security group allowing port 443 outbound AND an IAM role granting s3:PutObject to upload to S3.",
              codeExample:
                '# Security group: controls NETWORK traffic\naws ec2 authorize-security-group-ingress \\\n  --group-id sg-0123456789abcdef0 \\\n  --protocol tcp --port 443 --cidr 0.0.0.0/0\n\n# IAM role: controls AWS API permissions\naws iam put-role-policy --role-name EC2AppRole \\\n  --policy-name S3WriteAccess \\\n  --policy-document \'{\n    "Version": "2012-10-17",\n    "Statement": [{\n      "Effect": "Allow",\n      "Action": ["s3:PutObject"],\n      "Resource": "arn:aws:s3:::app-uploads/*"\n    }]\n  }\'',
            },
          ],
          why:
            "As an AWS cloud support engineer or solutions architect, IAM is the foundation of every single customer interaction. Misconfigured IAM policies are the number one cause of 'it doesn't work' tickets. Understanding the security model -- and being able to quickly distinguish between network-level and API-level access control -- lets you resolve permission issues in minutes rather than hours and prevents customers from deploying insecure architectures to production.",
          mentalModel:
            "Think of AWS IAM like a building's access badge system. The badge itself is the IAM identity (user/role). Each door has a reader that checks: (1) Who are you? (identity), (2) What doors can you open? (policy), (3) Is this the right building? (account/resource ARN). An explicit Deny is like a revoked badge -- it overrides any Allow. Security groups are the building's physical walls and locked doors (network layer), while IAM is the badge reader system (API layer). You always need both to get through.",
          concepts: [
            {
              title: "IAM Policy Evaluation Logic",
              explanation:
                "AWS evaluates IAM policies using a specific precedence: (1) Explicit Deny always wins. (2) If no explicit Deny, check for an explicit Allow. (3) If neither exists, the default is implicit Deny. Policies can be identity-based (attached to users/roles) or resource-based (attached to S3 buckets, Lambda functions, etc.). When cross-account access is involved, BOTH the identity policy in the source account AND the resource policy in the target account must allow the action.",
              example:
                "A customer's Lambda function returns 'AccessDeniedException' when calling dynamodb:PutItem. You check the execution role and find it has an Allow for dynamodb:* but there's also an SCP (Service Control Policy) at the Organization level that denies dynamodb:PutItem in us-west-2. The explicit Deny in the SCP overrides the Allow on the role.",
              codeSnippet:
                'import boto3\nimport json\n\n# Simulate an IAM policy to check if an action is allowed\niam = boto3.client("iam")\n\nresponse = iam.simulate_principal_policy(\n    PolicySourceArn="arn:aws:iam::123456789012:role/LambdaExecRole",\n    ActionNames=["dynamodb:PutItem"],\n    ResourceArns=["arn:aws:dynamodb:us-east-1:123456789012:table/Orders"]\n)\n\nfor result in response["EvaluationResults"]:\n    print(f"Action: {result[\'EvalActionName\']}")\n    print(f"Decision: {result[\'EvalDecision\']}")\n    # Output: \"explicitDeny\" or \"allowed\" or \"implicitDeny\"\n    if result["MatchedStatements"]:\n        for stmt in result["MatchedStatements"]:\n            print(f"  Matched policy: {stmt[\'SourcePolicyId\']}")',
            },
          ],
          miniExercises: [
            {
              id: "aws-1-1-m1",
              title: "Mini Exercise 1: Write a least-privilege Lambda policy",
              question:
                "A Lambda function needs to read items from a DynamoDB table called 'UserProfiles' and write logs to CloudWatch. Write the minimum IAM policy JSON.",
              steps: [
                {
                  instruction:
                    "Identify the exact IAM actions needed: dynamodb:GetItem and dynamodb:Query for reading, plus logs:CreateLogGroup, logs:CreateLogStream, and logs:PutLogEvents for CloudWatch Logs.",
                  example:
                    'Each action maps to a specific API call. dynamodb:GetItem allows reading a single item by key.',
                  hint:
                    "Don't use dynamodb:* -- scope to only the read actions you need. Remember to include the full ARN for the DynamoDB table resource.",
                },
              ],
              solution:
                '{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": [\n        "dynamodb:GetItem",\n        "dynamodb:Query"\n      ],\n      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/UserProfiles"\n    },\n    {\n      "Effect": "Allow",\n      "Action": [\n        "logs:CreateLogGroup",\n        "logs:CreateLogStream",\n        "logs:PutLogEvents"\n      ],\n      "Resource": "arn:aws:logs:us-east-1:123456789012:*"\n    }\n  ]\n}',
              explanation:
                "This policy follows least-privilege by granting only the specific DynamoDB read actions (not dynamodb:*) and scoping the resource to the exact table ARN. CloudWatch Logs permissions are required for any Lambda function to emit logs. If you used dynamodb:Scan instead of dynamodb:Query, you'd be granting a more expensive operation that isn't needed.",
            },
            {
              id: "aws-1-1-m2",
              title: "Mini Exercise 2: Diagnose an Access Denied error",
              question:
                "A customer's EC2 instance is getting 'An error occurred (AccessDenied) when calling the PutObject operation' when uploading to S3. The instance has an IAM role with s3:PutObject on 'arn:aws:s3:::company-data'. What's wrong?",
              steps: [
                {
                  instruction:
                    "Look carefully at the S3 ARN in the policy. Compare it to what a PutObject call actually targets. Remember that S3 bucket ARNs and S3 object ARNs are different.",
                  example:
                    "arn:aws:s3:::company-data is the bucket. arn:aws:s3:::company-data/* refers to objects inside the bucket.",
                  hint:
                    "PutObject operates on objects, not on the bucket itself. The resource ARN must include the /* suffix.",
                },
              ],
              solution:
                '# The policy resource is wrong:\n# "Resource": "arn:aws:s3:::company-data"    <-- this is the BUCKET\n# It should be:\n# "Resource": "arn:aws:s3:::company-data/*"   <-- these are OBJECTS in the bucket\n\n# Fix with AWS CLI:\naws iam put-role-policy --role-name EC2AppRole \\\n  --policy-name S3UploadAccess \\\n  --policy-document \'{\n    "Version": "2012-10-17",\n    "Statement": [{\n      "Effect": "Allow",\n      "Action": ["s3:PutObject"],\n      "Resource": "arn:aws:s3:::company-data/*"\n    }]\n  }\'',
              explanation:
                "This is one of the most common IAM mistakes. S3 has two resource types: the bucket (arn:aws:s3:::bucket-name) and objects within it (arn:aws:s3:::bucket-name/*). Operations like ListBucket target the bucket ARN, while PutObject, GetObject, and DeleteObject target object ARNs. The /* suffix is essential for object-level operations.",
            },
            {
              id: "aws-1-1-m3",
              title: "Mini Exercise 3: Choose EC2 vs Lambda",
              question:
                "A customer wants to process uploaded images (resize, apply filters). They receive 5-50 images per hour during business hours, zero at night. Each image takes 8 seconds to process. Should they use EC2 or Lambda? Justify with cost and architecture reasoning.",
              steps: [
                {
                  instruction:
                    "Consider the workload pattern: sporadic, short-duration tasks with idle periods. Calculate approximate costs for both options.",
                  example:
                    "A t3.micro running 24/7 costs ~$7.50/month. Lambda charges per invocation and duration.",
                  hint:
                    "Lambda is billed per 1ms of execution time. For 50 images/hour * 8 hours * 8 seconds each, that's about 3,200 seconds/day of compute.",
                },
              ],
              solution:
                "# Lambda is the clear winner here.\n# Cost analysis:\n# EC2 t3.medium (24/7): ~$30/month, paying for idle nights/weekends\n# Lambda: 50 imgs * 8 hrs * 8s = 3,200 seconds/day\n#   At 1024MB: 3,200 GB-seconds/day * 22 workdays = 70,400 GB-s/month\n#   Cost: ~$1.17/month compute + $0.09/month requests = ~$1.26/month\n\n# Architecture with Lambda:\nimport boto3\n\ndef lambda_handler(event, context):\n    s3 = boto3.client('s3')\n    for record in event['Records']:\n        bucket = record['s3']['bucket']['name']\n        key = record['s3']['object']['key']\n        # Download, process, re-upload\n        response = s3.get_object(Bucket=bucket, Key=key)\n        image_data = response['Body'].read()\n        processed = resize_image(image_data)  # your processing logic\n        s3.put_object(\n            Bucket=bucket,\n            Key=f'processed/{key}',\n            Body=processed\n        )\n    return {'statusCode': 200}",
              explanation:
                "Lambda excels for event-driven, sporadic workloads with short execution times. The customer pays nothing during nights and weekends. The S3 event notification triggers the Lambda automatically when an image is uploaded -- no polling, no idle servers. EC2 would require running 24/7 or implementing complex auto-scaling for such a simple workload.",
            },
          ],
          resources: [
            {
              label: "IAM Policy Reference - AWS Documentation",
              url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html",
            },
            {
              label: "Lambda Execution Role Best Practices",
              url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html",
            },
          ],
          whyItMatters:
            "IAM misconfigurations are behind the majority of AWS security incidents and a huge portion of support tickets. As a support engineer or solutions architect, you'll encounter Access Denied errors daily. The ability to quickly parse a policy, identify the evaluation logic, and pinpoint the misconfiguration separates a senior AWS professional from someone who guesses and checks. The EC2 vs Lambda decision framework you learned here will directly apply to architecture review conversations with customers.",
        },
      ],
      review: {
        id: "aws-ch1-review",
        type: "ChapterReview",
        coversLessons: ["aws-1-1"],
        questions: [
          {
            prompt:
              "A Lambda function has an Allow for s3:GetObject on arn:aws:s3:::data-bucket/*, but an SCP at the organization level denies all S3 actions in us-west-2. The function runs in us-west-2. Will the GetObject call succeed? Explain why.",
            expectedAnswer:
              "No. The explicit Deny in the SCP overrides the Allow on the Lambda role. In IAM policy evaluation, an explicit Deny at any level (SCP, identity policy, resource policy, permissions boundary) always takes precedence over any Allow.",
            bloomLevel: "Analyze",
            relatedLessonId: "aws-1-1",
          },
          {
            prompt:
              "What is the difference between an EC2 security group and an IAM role attached to that instance? Give a concrete example where both are needed.",
            expectedAnswer:
              "A security group controls network traffic (IP/port level) while an IAM role controls AWS API permissions. Example: an EC2 instance uploading to S3 needs a security group allowing outbound HTTPS (port 443) to reach the S3 endpoint AND an IAM role granting s3:PutObject on the target bucket ARN.",
            bloomLevel: "Understand",
            relatedLessonId: "aws-1-1",
          },
          {
            prompt:
              "A customer's policy grants s3:PutObject on 'arn:aws:s3:::my-bucket' but PutObject calls fail with AccessDenied. The bucket has no bucket policy or ACLs blocking access. What is the issue?",
            expectedAnswer:
              "The resource ARN points to the bucket itself, not objects within it. PutObject operates on objects, so the ARN must be 'arn:aws:s3:::my-bucket/*' with the /* suffix to target objects inside the bucket.",
            bloomLevel: "Apply",
            relatedLessonId: "aws-1-1",
          },
        ],
      },
    },
    {
      id: "aws-ch2",
      title: "Chapter 2 -- Infrastructure as Code",
      lessons: [
        {
          id: "aws-2-1",
          title: "CloudFormation, S3 Storage & VPC Networking",
          duration: 65,
          type: "Concept",
          bloomLevel: "Apply",
          prerequisites: ["aws-1-1"],
          learningObjectives: [
            "Author a CloudFormation template that provisions an S3 bucket, VPC with public and private subnets, and a Lambda function with correct IAM roles",
            "Diagnose CloudFormation stack failures by reading event logs and understanding rollback behavior",
            "Design a VPC architecture with public and private subnets, NAT gateways, and security groups that follows AWS Well-Architected Framework principles",
          ],
          commonMisconceptions: [
            {
              wrong:
                "If a CloudFormation stack fails to create, you just fix the template and run create-stack again with the same stack name",
              why:
                "Beginners assume a failed stack disappears, but AWS keeps it in ROLLBACK_COMPLETE state which blocks reuse of the name",
              correct:
                "A failed stack enters ROLLBACK_COMPLETE state. You must explicitly delete it with delete-stack before creating a new stack with the same name. Alternatively, use the --on-failure DELETE option during creation to auto-delete on failure, which is useful in CI/CD pipelines.",
              codeExample:
                "# Stack is stuck in ROLLBACK_COMPLETE\naws cloudformation describe-stacks --stack-name my-app \\\n  --query 'Stacks[0].StackStatus'\n# Output: \"ROLLBACK_COMPLETE\"\n\n# Must delete first\naws cloudformation delete-stack --stack-name my-app\naws cloudformation wait stack-delete-complete --stack-name my-app\n\n# Now you can recreate\naws cloudformation create-stack --stack-name my-app \\\n  --template-body file://template.yaml \\\n  --capabilities CAPABILITY_IAM \\\n  --on-failure DELETE   # auto-cleanup on failure",
            },
            {
              wrong:
                "A Lambda function in a VPC can access both the internet and other AWS services by default",
              why:
                "Beginners assume that placing a Lambda in a VPC just adds VPC access without losing anything",
              correct:
                "A Lambda function in a VPC only has access to resources within that VPC. To access the internet (or AWS services like S3 and DynamoDB), it must be placed in a private subnet with a NAT Gateway, or you must configure VPC Endpoints for the specific AWS services. A Lambda in a public subnet still cannot reach the internet because Lambda ENIs do not get assigned public IP addresses.",
              codeExample:
                "# CloudFormation: VPC Endpoint for S3 (avoids NAT Gateway cost)\nS3VPCEndpoint:\n  Type: AWS::EC2::VPCEndpoint\n  Properties:\n    ServiceName: !Sub com.amazonaws.${AWS::Region}.s3\n    VpcId: !Ref MyVPC\n    RouteTableIds:\n      - !Ref PrivateRouteTable\n    PolicyDocument:\n      Version: '2012-10-17'\n      Statement:\n        - Effect: Allow\n          Principal: '*'\n          Action: 's3:*'\n          Resource: '*'",
            },
          ],
          why:
            "As an AWS support engineer or solutions architect, customers will ask you to review their CloudFormation templates, debug failed deployments, and design VPC architectures. CloudFormation is the backbone of repeatable infrastructure -- when a stack rollback happens at 2 AM, you need to understand why it failed and how to fix it. VPC design errors are particularly expensive because they often require tearing down and rebuilding entire environments. Knowing S3's consistency model and access patterns prevents data loss and unexpected costs.",
          mentalModel:
            "Think of CloudFormation as a recipe and AWS as the kitchen. The template describes what you want (a VPC, some subnets, an S3 bucket) and CloudFormation is the chef that builds it in the right order, handling dependencies automatically. If any ingredient is wrong (a typo in a CIDR block, a missing IAM permission), the chef throws out everything and starts over (rollback). A VPC is like a private office building: the VPC is the building, subnets are floors, route tables are hallways connecting floors to exits, the Internet Gateway is the front door, and the NAT Gateway is a one-way mail slot that lets private floors send mail out without exposing them to walk-in visitors.",
          concepts: [
            {
              title: "CloudFormation Resource Dependencies and Stack Lifecycle",
              explanation:
                "CloudFormation builds resources in parallel where possible, but respects explicit (DependsOn) and implicit (Ref, Fn::GetAtt) dependencies. When a resource fails to create, CloudFormation rolls back all previously created resources in reverse dependency order. Understanding this lifecycle is critical for debugging: the first error in the event log is usually the root cause, and subsequent errors are just cascading rollback noise. Stack updates use change sets to preview modifications, and some property changes require resource replacement (delete old, create new) which can cause downtime.",
              example:
                "A customer's CloudFormation stack fails during an update. The event log shows 40 errors, but the root cause is a single line: the Lambda function's runtime was changed from python3.9 to python3.13, which isn't supported in their region yet. All other errors are CloudFormation rolling back dependent resources (API Gateway, IAM roles) because the Lambda failed.",
              codeSnippet:
                "AWSTemplateFormatVersion: '2010-09-09'\nDescription: S3 bucket with Lambda processor in a VPC\n\nParameters:\n  Environment:\n    Type: String\n    AllowedValues: [dev, staging, prod]\n    Default: dev\n\nResources:\n  # VPC with public and private subnets\n  AppVPC:\n    Type: AWS::EC2::VPC\n    Properties:\n      CidrBlock: 10.0.0.0/16\n      EnableDnsSupport: true\n      EnableDnsHostnames: true\n      Tags:\n        - Key: Name\n          Value: !Sub ${Environment}-app-vpc\n\n  PrivateSubnet:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId: !Ref AppVPC\n      CidrBlock: 10.0.1.0/24\n      AvailabilityZone: !Select [0, !GetAZs '']\n      Tags:\n        - Key: Name\n          Value: !Sub ${Environment}-private-subnet\n\n  # S3 bucket for data storage\n  DataBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: !Sub ${Environment}-data-${AWS::AccountId}\n      VersioningConfiguration:\n        Status: Enabled\n      BucketEncryption:\n        ServerSideEncryptionConfiguration:\n          - ServerSideEncryptionByDefault:\n              SSEAlgorithm: AES256\n\n  # Lambda execution role (least privilege)\n  ProcessorRole:\n    Type: AWS::IAM::Role\n    Properties:\n      AssumeRolePolicyDocument:\n        Version: '2012-10-17'\n        Statement:\n          - Effect: Allow\n            Principal:\n              Service: lambda.amazonaws.com\n            Action: sts:AssumeRole\n      ManagedPolicyArns:\n        - arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole\n      Policies:\n        - PolicyName: S3ReadAccess\n          PolicyDocument:\n            Version: '2012-10-17'\n            Statement:\n              - Effect: Allow\n                Action:\n                  - s3:GetObject\n                  - s3:ListBucket\n                Resource:\n                  - !GetAtt DataBucket.Arn\n                  - !Sub ${DataBucket.Arn}/*\n\n  # Lambda function in the VPC\n  ProcessorFunction:\n    Type: AWS::Lambda::Function\n    Properties:\n      FunctionName: !Sub ${Environment}-data-processor\n      Runtime: python3.12\n      Handler: index.handler\n      Role: !GetAtt ProcessorRole.Arn\n      Timeout: 30\n      MemorySize: 256\n      VpcConfig:\n        SubnetIds:\n          - !Ref PrivateSubnet\n        SecurityGroupIds:\n          - !Ref LambdaSG\n      Code:\n        ZipFile: |\n          import boto3\n          def handler(event, context):\n              s3 = boto3.client('s3')\n              for record in event['Records']:\n                  bucket = record['s3']['bucket']['name']\n                  key = record['s3']['object']['key']\n                  obj = s3.get_object(Bucket=bucket, Key=key)\n                  # Process the object\n                  return {'statusCode': 200}\n\n  LambdaSG:\n    Type: AWS::EC2::SecurityGroup\n    Properties:\n      GroupDescription: Security group for Lambda function\n      VpcId: !Ref AppVPC\n      SecurityGroupEgress:\n        - IpProtocol: tcp\n          FromPort: 443\n          ToPort: 443\n          CidrIp: 0.0.0.0/0\n\nOutputs:\n  BucketName:\n    Value: !Ref DataBucket\n  FunctionArn:\n    Value: !GetAtt ProcessorFunction.Arn\n  VPCId:\n    Value: !Ref AppVPC",
            },
          ],
          miniExercises: [
            {
              id: "aws-2-1-m1",
              title: "Mini Exercise 1: Debug a failed CloudFormation stack",
              question:
                "A CloudFormation stack creation failed. The customer sends you the stack name. Walk through the diagnostic process to find the root cause.",
              steps: [
                {
                  instruction:
                    "Use the AWS CLI to list stack events and find the first CREATE_FAILED event, which is typically the root cause. Filter out the rollback noise.",
                  example:
                    'aws cloudformation describe-stack-events --stack-name my-app --query "StackEvents[?ResourceStatus==\'CREATE_FAILED\']"',
                  hint:
                    "Stack events are listed in reverse chronological order. The root cause is the FIRST CREATE_FAILED event (last in the list). Everything after it is cascading rollback.",
                },
              ],
              solution:
                "# Step 1: Check stack status\naws cloudformation describe-stacks --stack-name my-app \\\n  --query 'Stacks[0].{Status:StackStatus,Reason:StackStatusReason}'\n\n# Step 2: Find the root cause -- first CREATE_FAILED event\naws cloudformation describe-stack-events --stack-name my-app \\\n  --query \"StackEvents[?ResourceStatus=='CREATE_FAILED'].{Resource:LogicalResourceId,Reason:ResourceStatusReason}\" \\\n  --output table\n\n# Step 3: Common root causes to look for:\n# - \"Resource handler returned message: 'The runtime parameter of python3.13 is not supported'\"\n# - \"The IAM role ... does not exist or is not assumable\"\n# - \"The CIDR 10.0.0.0/16 conflicts with another subnet\"\n\n# Step 4: Delete failed stack and retry\naws cloudformation delete-stack --stack-name my-app\naws cloudformation wait stack-delete-complete --stack-name my-app",
              explanation:
                "The key insight is that most of the errors in a failed stack are rollback noise. CloudFormation rolls back in reverse dependency order, so you see dozens of DELETE_IN_PROGRESS events. The actual bug is always the first CREATE_FAILED event. Reading stack events is the single most important CloudFormation debugging skill.",
            },
            {
              id: "aws-2-1-m2",
              title: "Mini Exercise 2: Design a VPC with public and private subnets",
              question:
                "A customer needs a VPC where web servers are publicly accessible but their database is in a private subnet with no direct internet access. The private subnet must still be able to pull software updates. Draw the architecture and write the key CloudFormation resources.",
              steps: [
                {
                  instruction:
                    "Identify the four key components: public subnet (with Internet Gateway route), private subnet (with NAT Gateway route), Internet Gateway, and NAT Gateway. The NAT Gateway sits in the public subnet but serves the private subnet.",
                  example:
                    "Public subnet route table: 0.0.0.0/0 -> Internet Gateway. Private subnet route table: 0.0.0.0/0 -> NAT Gateway.",
                  hint:
                    "The NAT Gateway itself needs a public IP (Elastic IP) and must be in the public subnet. The private subnet's route table points to the NAT Gateway for outbound internet access.",
                },
              ],
              solution:
                "# Key resources for public + private subnet architecture:\n\n# 1. Internet Gateway (front door)\nInternetGateway:\n  Type: AWS::EC2::InternetGateway\n\nGatewayAttachment:\n  Type: AWS::EC2::VPCGatewayAttachment\n  Properties:\n    VpcId: !Ref VPC\n    InternetGatewayId: !Ref InternetGateway\n\n# 2. NAT Gateway in PUBLIC subnet (one-way mail slot)\nNATElasticIP:\n  Type: AWS::EC2::EIP\n  Properties:\n    Domain: vpc\n\nNATGateway:\n  Type: AWS::EC2::NatGateway\n  Properties:\n    AllocationId: !GetAtt NATElasticIP.AllocationId\n    SubnetId: !Ref PublicSubnet   # NAT lives in PUBLIC subnet\n\n# 3. Route tables\nPublicRouteTable:\n  Type: AWS::EC2::RouteTable\n  Properties:\n    VpcId: !Ref VPC\n\nPublicRoute:\n  Type: AWS::EC2::Route\n  Properties:\n    RouteTableId: !Ref PublicRouteTable\n    DestinationCidrBlock: 0.0.0.0/0\n    GatewayId: !Ref InternetGateway   # Public -> IGW\n\nPrivateRouteTable:\n  Type: AWS::EC2::RouteTable\n  Properties:\n    VpcId: !Ref VPC\n\nPrivateRoute:\n  Type: AWS::EC2::Route\n  Properties:\n    RouteTableId: !Ref PrivateRouteTable\n    DestinationCidrBlock: 0.0.0.0/0\n    NatGatewayId: !Ref NATGateway   # Private -> NAT",
              explanation:
                "This is the standard AWS two-tier architecture. The public subnet has a route to the Internet Gateway for bidirectional internet access (web servers live here). The private subnet routes outbound traffic through the NAT Gateway, which allows instances to initiate outbound connections (for updates, API calls) but prevents inbound connections from the internet. The NAT Gateway must reside in the public subnet because it needs internet access to forward traffic, and it requires an Elastic IP for a stable public address.",
            },
            {
              id: "aws-2-1-m3",
              title: "Mini Exercise 3: S3 bucket policy for cross-account access",
              question:
                "Account A (111111111111) owns an S3 bucket. Account B (222222222222) needs to read objects from it. Write both the bucket policy on Account A and the IAM policy on Account B's role.",
              steps: [
                {
                  instruction:
                    "Remember that cross-account S3 access requires BOTH a resource policy (bucket policy on Account A) AND an identity policy (IAM policy on Account B's role). Both must explicitly Allow the action.",
                  example:
                    "The bucket policy specifies Account B's role as the Principal. Account B's IAM policy specifies the bucket ARN as the Resource.",
                  hint:
                    "Use the full ARN of Account B's role as the Principal in the bucket policy. Don't forget both the bucket ARN (for ListBucket) and the object ARN with /* (for GetObject).",
                },
              ],
              solution:
                '# Account A: Bucket policy (resource-based)\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Sid": "AllowAccountBRead",\n      "Effect": "Allow",\n      "Principal": {\n        "AWS": "arn:aws:iam::222222222222:role/DataReaderRole"\n      },\n      "Action": [\n        "s3:GetObject",\n        "s3:ListBucket"\n      ],\n      "Resource": [\n        "arn:aws:s3:::shared-data-bucket",\n        "arn:aws:s3:::shared-data-bucket/*"\n      ]\n    }\n  ]\n}\n\n# Account B: IAM policy on DataReaderRole (identity-based)\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": [\n        "s3:GetObject",\n        "s3:ListBucket"\n      ],\n      "Resource": [\n        "arn:aws:s3:::shared-data-bucket",\n        "arn:aws:s3:::shared-data-bucket/*"\n      ]\n    }\n  ]\n}',
              explanation:
                "Cross-account access is a two-sided handshake. Account A's bucket policy says 'I allow this specific role from Account B to read.' Account B's IAM policy says 'I allow my role to read from this specific bucket.' If either side is missing, access is denied. Note that ListBucket uses the bucket ARN (without /*) while GetObject uses the object ARN (with /*) -- this is the same bucket vs. object distinction from Chapter 1.",
            },
          ],
          resources: [
            {
              label: "CloudFormation Template Reference",
              url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html",
            },
            {
              label: "VPC with Public and Private Subnets - AWS Documentation",
              url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html",
            },
          ],
          whyItMatters:
            "Infrastructure as Code is how every serious AWS deployment operates. When a customer's production stack fails to update at 2 AM, your ability to read CloudFormation events, identify the root cause, and guide them through a recovery is what prevents extended outages. VPC design mistakes are among the most expensive errors in AWS -- a misconfigured route table can expose a private database to the internet or completely isolate a Lambda function from the services it needs. The patterns you learned here are the building blocks of every AWS architecture review.",
        },
      ],
      review: {
        id: "aws-ch2-review",
        type: "ChapterReview",
        coversLessons: ["aws-2-1"],
        questions: [
          {
            prompt:
              "A CloudFormation stack creation failed and is in ROLLBACK_COMPLETE state. The customer tries to run create-stack with the same name and gets an error. What should they do and why?",
            expectedAnswer:
              "They must delete the failed stack first with 'aws cloudformation delete-stack' because a stack in ROLLBACK_COMPLETE state still exists and blocks name reuse. Alternatively, for future deployments, they can use --on-failure DELETE to auto-cleanup failed stacks.",
            bloomLevel: "Apply",
            relatedLessonId: "aws-2-1",
          },
          {
            prompt:
              "A Lambda function is placed in a VPC private subnet. It can access RDS in the same VPC but cannot call the S3 API. What are two ways to fix this?",
            expectedAnswer:
              "Option 1: Add a NAT Gateway in a public subnet and route the private subnet's 0.0.0.0/0 traffic through it. Option 2: Create an S3 VPC Endpoint (Gateway type), which allows the Lambda to reach S3 without traversing the internet, and is free of per-hour charges unlike NAT Gateway.",
            bloomLevel: "Analyze",
            relatedLessonId: "aws-2-1",
          },
          {
            prompt:
              "Why does cross-account S3 access require both a bucket policy on the source account and an IAM policy on the destination account's role?",
            expectedAnswer:
              "AWS evaluates cross-account access as a two-sided check. The resource policy (bucket policy) in the owning account must explicitly allow the external principal, AND the identity policy in the requesting account must explicitly allow the action on the resource. If either side is missing the Allow, the request is denied with implicit deny.",
            bloomLevel: "Understand",
            relatedLessonId: "aws-2-1",
          },
        ],
      },
    },
  ],
};
