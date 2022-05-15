
source "$(dirname "$0")/../shared/utils.sh"

renderTemplate() { try envsubst < "$1.tpl" > "$1"; }

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  die 1 "Missing (AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY) or AWS_DEFAULT_PROFILE"
fi

export APP_NAME="price-comparator"
export VERSION="1.0.0"
export HOST_PORT=80
export CONTAINER_PORT=8000

export AWS_REGIONS=("eu-central-1")
export ECR_URI="895242073208.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
export APP_ECR_URI="$ECR_URI/$APP_NAME"

export IMAGE_TAG="$APP_ECR_URI:$VERSION"
export ECS_TASK_NAME="price-comparator_task"
export ECS_FAMILY_NAME="price-comparator_family"
export ECS_SERVICE_NAME="price-comparator_service"
export ECS_TASK_ROLE="arn:aws:iam::895242073208:role/price-comparator_ecs"
export ECS_CLUSTER_NAME="gz-dev"

# PACKAGE

echoStart "Preparing package..."

try yarn run package

echoSuccess "Package done"

# DOCKER IMAGE

echoStart "Building docker image..."

try docker build -t $IMAGE_TAG -f deploy/Dockerfile . --build-arg CONTAINER_PORT="${CONTAINER_PORT}"

echoSuccess "Docker image done"

# AWS

echoStart "Preparing AWS upload..."

renderTemplate "deploy/task_definition.json"

echoSuccess "AWS upload preparation done"

# AWS Deployment

echoStart "Deploying to AWS..."

echoStart "Deploying in $AWS_DEFAULT_REGION region..."

echo "Deploying docker image $IMAGE_TAG..."
try aws ecr get-login-password | docker login --username AWS --password-stdin $APP_ECR_URI
try docker push "$IMAGE_TAG"

echoSuccess "Deployment in $AWS_DEFAULT_REGION done"

for aws_region in "${AWS_REGIONS[@]}"; do
  (
    export AWS_DEFAULT_REGION="$aws_region"

    echoStart "Deploying in $AWS_DEFAULT_REGION region..."

    try aws ecs register-task-definition --family "$ECS_FAMILY_NAME" --cli-input-json "file://deploy/task_definition.json"

    try aws ecs update-service --cluster "$ECS_CLUSTER_NAME" --service "$ECS_SERVICE_NAME" --task-definition "$ECS_FAMILY_NAME"

    echoSuccess "Deployment in $AWS_DEFAULT_REGION region done"
  )
done

echoSuccess "AWS Deployment done"