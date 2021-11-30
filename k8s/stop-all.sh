#!/bin/bash
kubectl delete -f node-mongo.yaml 
kubectl delete -f mongo-configmap.yaml 
kubectl delete -f mongo.yaml 
kubectl delete -f mongo-secret.yaml 