pipeline {
    agent any
    environment {
        NAME = 'renderany'
        PROFILE = 'dev'
        APP = 'registry.cn-hangzhou.aliyuncs.com/chongqiangchen/renderany:dev'
        APP_PORT = 80
    }

    stages {
        stage('环境准备') {
          parallel{
            stage('Front End Build: Angular') {
                agent {
                    docker {
                       image 'node:14.16.0'
                    }
                }
                steps {
                   sh 'npm ci'
                   sh 'npm run build'
                }
            }
          }
        }

        stage('构建Docker镜像') {
            steps {
                sh 'docker ps -a|grep $NAME|awk \'{print $1}\'|xargs -i docker stop {}|xargs -i docker rm {}'
                sh 'docker images|grep $NAME|grep dev|awk \'{print $3}\'|xargs -i docker rmi {}'

                sh 'docker build --build-arg PROFILE=dev -t $APP .'
            }
        }

        stage('运行容器') {
            steps {
                sh 'docker run -d -p $APP_PORT:80 --restart=always --name $NAME $APP'
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
