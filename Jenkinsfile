pipeline {
    agent any

    options {
        // if the build takes more than 30 minutes, abort entire pipeline
        timeout(time: 30, unit: 'MINUTES')
    }
    
    stages {
        stage('Build') {
            steps {
               script {
                    def nodejsInstallation = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsInstallation}/bin:${env.PATH}"
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'chmod +x ./scripts/JenkinsScript.sh'
                sh './scripts/JenkinsScript.sh'
            }
        }
        stage('OWASP DependencyCheck') { 
            steps { 
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency Check' 
            } 
        }
         stage('Deployment') {
            steps {
                script {
                    def sshKey = credentials('SSHCredential') // Replace with your SSH credentials ID
                    def remoteUser = 'student56'
                    def ec2HostName = '52.221.187.45'
                    def remoteDirectory = '/home/student56/deployment'

                    // Copy the frontend code to the EC2 instance
                    sh "scp -i ${sshKey} -r /home/student56/GitHub/ict3x03-team7-frontend ${remoteUser}@${ec2HostName}:${remoteDirectory}"

                    // Copy the backend code to the EC2 instance
                    //sh "scp -i ${sshKey} -r /home/student56/GitHub/ict3x03-team7-backend ${remoteUser}@${ec2HostName}:${remoteDirectory}"
                }
            }
        }
    }
    post { 
        success { 
            dependencyCheckPublisher pattern: 'dependency-check-report.xml' 
        } 
    }
}
