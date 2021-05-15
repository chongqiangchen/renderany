pipeline {
    agent any

    environment {
        NAME = 'renderany'
        PROFILE = 'dev'
        APP = 'registry.cn-hangzhou.aliyuncs.com/chongqiangchen/renderany:dev'
        APP_PORT = 80
    }

    stages {
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
