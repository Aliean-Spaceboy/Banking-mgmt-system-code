import axios from 'axios';

	const Account_API_BASE_URL="http://localhost:9090/api/accounts/";

	class AccountService{

 	   	getAccounts(){
        	return axios.get(Account_API_BASE_URL);
    		}
	}
	export default new AccountService();
