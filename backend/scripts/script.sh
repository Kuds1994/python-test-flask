#Script usado para criar um usuário no banco para o acesso ao banco de dados quando inicia uma nova aplicação no docker
echo "Creating new user g..."
#Código para criar o usuário
mysql --user="root" --password="root" -e "CREATE USER 'user'@'%' IDENTIFIED BY 'pass';"
echo "Granting privileges..."
#Garantir todos os privilegios para ele
mysql --user="root" --password="root" -e "GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';"
mysql --user="root" --password="root" -e "FLUSH PRIVILEGES;"
#Uma mensagem para o informar que foi cadastrado com sucesso
echo "All done."