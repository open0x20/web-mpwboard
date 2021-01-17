pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'node --max-heap-size=512 /usr/bin/npm install'
                withCredentials([file(credentialsId: 'dd055e3b-e78a-4155-9399-30c160457d83', variable: 'secretsFile')]) {
                    sh 'cat $secretsFile > src/globals.ts'
                }
                sh 'node --max-heap-size=512 /usr/bin/npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'ls -al'
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'DEPLOY@WEB_HOST_0',
                            transfers: [
                                sshTransfer(
                                    cleanRemote: true,
                                    excludes: '',
                                    execCommand: '',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: 'web-mpwboard',
                                    remoteDirectorySDF: false,
                                    removePrefix: 'dist',
                                    sourceFiles: 'dist/**'
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false
                        )
                    ]
                )
            }
        }
    }
}
