[![Terraform Registry](https://img.shields.io/badge/Terraform%20Registry-available-blue.svg)](https://registry.terraform.io/modules/seu-nome-de-usuario/seu-modulo)
[![AWS](https://img.shields.io/badge/AWS-supported-orange.svg)](https://aws.amazon.com/)
[![Serverless Framework](https://img.shields.io/badge/Serverless-Framework-orange.svg)](https://www.serverless.com/)

<<<<<<< HEAD


# Tech Challenge - Fase 03 (GRUPO 31) - AWS Api Gateway && Lambdas
=======
# Tech Challenge - Fase 03 (GRUPO 31) - AWS Infraestrutura
>>>>>>> 04a782a52040db40d3bcba4254b276c7d9f61f63

Este repositório o terraform + aplicação para criação dos seguintes itens:

* 1 API Gateway endpoint
* 1 Lambda Autentication
* 1 Lambda Authorizer

## Requisitos

* [Terraform](https://www.terraform.io/) - Terraform is an open-source infrastructure as code software tool that provides a consistent CLI workflow to manage hundreds of cloud services. Terraform codifies cloud APIs into declarative configuration files.
* [Amazon AWS Account](https://aws.amazon.com/it/console/) - Amazon AWS account with billing enabled
* [aws cli](https://aws.amazon.com/cli/) optional
* [Serverless Framework](https://www.serverless.com/) - The Serverless Framework is an open-source application framework for building and deploying serverless applications. It provides a simple, intuitive way to define serverless resources and manage deployments.


## Jornada de teste

Autenticar um cpf para gerar o JWT
```
curl --location 'http://[API_GATEWAY]/authenticate' \
--header 'Content-Type: application/json' \
--data '{
    "_cpf": "00000000000"
}'

```

## Antes de começar

Esta execução esta fora do nível gratuito da AWS, importante avaliar antes de executar

## AWS configuração

Com os requisitos já identificados, configure abaixo no secrets do github.

```
AWS_ACCESS_KEY = "xxxxxxxxxxxxxxxxx"
AWS_SECRET_KEY = "xxxxxxxxxxxxxxxxx"
```


## Jornada de teste

Autenticar um cpf para gerar o JWT
```
curl --location 'http://[API_GATEWAY]/authenticate' \
--header 'Content-Type: application/json' \
--data '{
    "_cpf": "00000000000"
}'

```

Nas proximas requisições da aplicação utilizar Authentication Bearer: JWT

## Uso

Com os requisitos já identificados, configure abaixo no secrets do github.

```
      - name: Checkout do repositório
        uses: actions/checkout@v2
    
      - name: Configurando a AWS Credentials Action para o GitHub Actions
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          aws-region: us-east-1
      - name: Setup Terraform CLI
        uses: hashicorp/setup-terraform@v2.0.2

      - name: Obtendo VPCID e ELBAPP
        run: |
          export VPC_ID=$(aws ec2 describe-vpcs --filters Name=tag:Name,Values=Fiap_Pixels --query 'Vpcs[0].VpcId' --output text)
          echo $VPC_ID
          export ELBAPP=$(aws elbv2 describe-load-balancers --query "LoadBalancers[?contains(VpcId, 'vpc-0b99899d52f9a4fe7')].DNSName" --output text)
          echo $ELBAPP
          echo "ELBAPP=$ELBAPP" > .env

      - name: Instalando Serverless Framework
        run: npm install -g serverless

      - name: Instalando dependencias
        run: npm install

      - name: Terraform Init - Iniciando
        run: terraform init

      - name: Terraform Apply - Aplicando
        run: terraform apply -auto-approve -var "aws_access_key=${{ secrets.AWS_ACCESS_KEY }}" -var "aws_secret_key=${{ secrets.AWS_SECRET_KEY }}"
```

### Execução do projeto

Ao efetuar um push no repositório develop com sucesso, é necessário efetuar um pull request na branch master para que a execução do pipeline do workflow seja executado
