{
  "containerDefinitions": [
    {
      "name": "${ECS_TASK_NAME}",
      "image": "${IMAGE_TAG}",
      "cpu": 1,
      "memory": 300,
      "secrets": [
      ],
      "environment": [
      ],
      "portMappings": [
        {
          "hostPort": ${HOST_PORT},
          "containerPort": ${CONTAINER_PORT},
          "protocol": "tcp"
        }
      ],
      "essential": true
    }
  ],
  "executionRoleArn":"${ECS_TASK_ROLE}",
  "taskRoleArn":"${ECS_TASK_ROLE}",
  "family": "${ECS_FAMILY_NAME}"
}
