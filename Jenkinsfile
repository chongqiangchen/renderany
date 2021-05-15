properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any

    environment {
        NAME = 'renderany'
        PROFILE = 'dev'
        APP = 'registry.cn-hangzhou.aliyuncs.com/chongqiangchen/renderany:dev'
        APP_PORT = 80
    }

    stages {
        /* checkout repo */
        stage('Checkout SCM') {
            steps {
                checkout([
                 $class: 'GitSCM',
                 branches: [[name: 'dev']],
                 userRemoteConfigs: [[
                    url: 'https://github.com/chongqiangchen/renderany.git',
                    credentialsId: 'da3e7885-1696-4f3b-8544-dd2c1ef4966d',
                 ]]
                ])
            }
        }
         stage('Do the deployment') {
            steps {
                echo ">> Run deploy applications "
            }
        }
    }

    /* Cleanup workspace */
    post {
       always {
           deleteDir()
       }
   }
}
