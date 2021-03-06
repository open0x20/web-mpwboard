pipeline {
    agent {
        docker {
            image 'node:14.5'
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Install') {
            steps {
                echo 'Installing...'
                echo 'If installing fails because of java heap out of memory exceptions, simply rerun the build.'
                sh '$(which npm) install'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                withCredentials([file(credentialsId: 'dd055e3b-e78a-4155-9399-30c160457d83', variable: 'secretsFile')]) {
                    sh 'cat $secretsFile > src/globals.ts'
                }
                sh '$(which npm) run build'
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
                                    remoteDirectory: 'web-mpwboard--development',
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
