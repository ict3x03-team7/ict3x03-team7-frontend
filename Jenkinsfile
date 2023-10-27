pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo "Buidling "
            }
        }
        stage('OWASP DependencyCheck') { 
            steps { 
                sh 'apk add yarn' 
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency Check' 
            } 
        }
    }
    post { 
        success { 
            dependencyCheckPublisher pattern: 'dependency-check-report.xml' 
        } 
    }
}
