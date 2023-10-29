pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                nodejs('NodeJS'){
                    sh 'yarn install'
                }
            }
        }
        stage('OWASP DependencyCheck') { 
            steps { 
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
