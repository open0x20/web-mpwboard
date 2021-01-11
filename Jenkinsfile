pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh '#npm install'
                sh '#npm run build'
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
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: 'rm -rf web-mpwboard/',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    cleanRemote: false,
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
                                    sourceFiles: 'dist/*'
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
