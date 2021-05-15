pipeline {
    agent any

    triggers {
      pollSCM('H/2 * * * *')
    }

    options {
      timeout(time: 10, unit: 'MINUTES')
    }

    stages{
      stage("install"){
        steps{
          sh "yarn install"
        }
      }
    }
}
