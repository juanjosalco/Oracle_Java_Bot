echo delete frontend deployment and service...
kubectl -n talent-pentagon delete deployment orabot-deployment
kubectl -n talent-pentagon delete service orabot-service