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
                git 'https://github.com/YagoTaira/FullSTack-Prototype.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("backend-app:latest", "./backend")
                    docker.build("frontedn-app:latest", "./frontend")
                }
            }
        }
        stage('Push Images to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKERHUB_CREDENTIALS}") {
                        // Push Backend Image
                        docker.image("${DOCKERHUB_USERNAME}/backend-app:${env.BUILD_NUMBER}").push('latest')

                        // Push Frontend Image
                        docker.image("${DOCKERHUB_USERNAME}/frontend-app:${env.BUILD_NUMBER}").push('latest')
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