pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKERHUB_CREDENTIALS = 'docker-hub-credentials'
        DOCKERHUB_USERNAME = 'yagotaira'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YagoTaira/FullSTack-Prototype.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    // Build Backend
                    sh './mvnw clean package'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // Build Frontend
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Backend Image
                    backendImage = docker.build("${DOCKERHUB_USERNAME}/backend-app:${env.BUILD_NUMBER}", "./backend")

                    // Build Frontend Image
                    frontendImage = docker.build("${DOCKERHUB_USERNAME}/frontend-app:${env.BUILD_NUMBER}", "./frontend")
                }
            }
        }
        stage('Push Images to Registry') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
                        // Push Backend Image
                        backendImage.push()
                        backendImage.push('latest')

                        // Push Frontend Image
                        frontendImage.push()
                        frontendImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster'
                // Add kubectl commands or use Kubernetes plugin for deployment
            }
        }
    }

    post {
        success {
            echo 'Build, Push and Deployment Sucessful!'
        }
        failure {
            echo 'Build, Push or Deployment Failed.'
        }
    }
}