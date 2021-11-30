#!/bin/bash
kubectl apply -f mongo-secret.yaml 
kubectl apply -f mongo.yaml 
kubectl apply -f mongo-configmap.yaml 
kubectl apply -f node-mongo.yaml 