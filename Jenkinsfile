
pipeline {
    agent any

    tools {
        maven 'Maven-3'
    }

    options {
        timestamps()
    }
	
	environment {
    SPRING_DATASOURCE_URL = 'jdbc:mysql://host.docker.internal:3306/auth_app_yt'
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
                    sh 'mvn -B clean verify'
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
