pipeline {
    agent { label 'Ali' }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Fetching latest source code..."
                git url: "https://github.com/AbdullahbinAmin/react-django-notes-app.git", branch: "main"
                echo "Code Cloning Successful"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image (Frontend + Backend Multi-stage)..."
                sh "docker build -t notes-app:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Logging in to Docker Hub..."
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerHubCred', 
                        passwordVariable: 'dockerHubPass', 
                        usernameVariable: 'dockerHubUser'
                    )
                ]) {
                    sh "docker login -u ${env.dockerHubUser} -p '${env.dockerHubPass}'"
                    sh "docker image tag notes-app:latest ${env.dockerHubUser}/notes-app:latest"
                    sh "docker push ${env.dockerHubUser}/notes-app:latest"
                }
            }
        }

        stage('Setup Environment (.env)') {
            steps {
                echo "Injecting .env file from Jenkins Secret File credential..."
                withCredentials([file(credentialsId: 'django-env-file', variable: 'ENV_FILE')]) {
                    sh 'cp $ENV_FILE .env'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo "Deploying containerized application with Docker Compose..."
                sh 'docker compose down'
                sh 'docker compose up -d --build'
                echo "Deployment Successful!"
            }
        }
    }
}