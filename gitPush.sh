#!/bin/bash

# Vérifiez si un message de commit a été fourni en argument
if [ -z "$1" ]
then
  echo "Veuillez fournir un message de commit."
  exit 1
fi

# Ajoutez tous les changements au staging area
git add .

# Effectuez le commit avec le message fourni
git commit -m "$1"

# Poussez les changements vers le repository distant
git push

# Message de confirmation
echo "Les changements ont été poussés avec succès."
