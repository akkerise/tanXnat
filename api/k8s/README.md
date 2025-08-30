Deploy with K8S:
1. Create cluster
```
$ gcloud container clusters create secapp-stg \\n    --num-nodes=3 \\n    --release-channel regular
```
2. Connect cluster
```
$ gcloud container clusters get-credentials secapp-stg --region=asia-east2-a
```
3. Apply Redis
```
$ kubectl apply -f redis.yaml
```
5. Apply ConfigMap
```
$ kubectl apply -f configmap.yaml
```
6. Apply Deployment
```
$ kubectl apply -f deployment.yaml
```
7. Apply Service
```
$ kubectl apply -f service.yaml
```
8. Apply deploy
```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml
```
9. Create issue
```
$ kubectl apply -f staging_issuer.yaml
```
10. Apply ingress
```
$ kubectl apply -f ingress.yaml
```

##############
1. Setup Docker Artifact
```
gcloud auth configure-docker us-east1-docker.pkg.dev
docker-credential-gcr configure-docker us-east1-docker.pkg.dev
```
https://gist.github.com/palewire/12c4b2b974ef735d22da7493cf7f4d37

export PROJECT_ID=secapp-48fa7
export SERVICE_ACCOUNT=secapp-service-account
export WORKLOAD_IDENTITY_POOL=secapp-pool

export WORKLOAD_IDENTITY_POOL_ID=projects/721290659658/locations/global/workloadIdentityPools/secapp-pool
export WORKLOAD_PROVIDER=secapp-provider
export REPO=suguyobu/sec-api
kubectl rollout restart deployment/secapi
