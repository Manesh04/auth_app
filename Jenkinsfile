
pipeline {
    agent any

    tools {
        maven 'Maven-3'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Package') {
            steps {
                dir('auth-app-backend') {
                    sh 'mvn -B clean package -DskipTests'
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts(
                artifacts: 'auth-app-backend/target/auth-app-backend-0.0.1-SNAPSHOT.jar',
                fingerprint: true
            )
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
