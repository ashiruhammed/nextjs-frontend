pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  options {
    timestamps()
  }

  stages {
    stage('Setup') {
      steps {
        echo "🔧 Setting up environment for branch: ${env.BRANCH_NAME}"
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        echo "🧪 Running tests on branch: ${env.BRANCH_NAME}"
        sh 'npm test'
      }
    }

    stage('Build') {
      when {
        expression { env.BRANCH_NAME == 'main' }
      }
      steps {
        echo "🏗️ Building Next.js app for production (main branch only)..."
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        expression { env.BRANCH_NAME == 'main' }
      }
      steps {
        echo "🚀 Deploying app (main branch only)..."
        // Example: use vercel or rsync, etc.
        // sh 'vercel --prod'
        echo "Deployment step goes here."
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline succeeded for branch: ${env.BRANCH_NAME}"
    }
    failure {
      echo "❌ Pipeline failed for branch: ${env.BRANCH_NAME}"
    }
  }
}
