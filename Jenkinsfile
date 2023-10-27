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
                script {
                    def nodejsInstallation = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsInstallation}/bin:${env.PATH}"
                    sh 'yarn install '
                }
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
