import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from '../router';
import { Base64 } from 'js-base64';
import { io } from "socket.io-client";

Vue.use(Vuex, axios);

// API Documentación:

const BASE_URL_API = "https://ikcount.com/iklab";
const BASE_URL_SIO = "https://ikcount.com";
// const client_id = "IK001";
const location_id = "IK001L1";
const device_id = "IK001MC1";



export default new Vuex.Store({
	state: {
		token: null,
		count: 0,
		user:null,
	},
	
	
	mutations: {
		setToken: (state, token) => state.token = token,
		setUser: (state, user) => state.user = user,
	},

	
	actions: {
		Login({commit}, credentials) {
			const auth = Base64.encode(`${credentials.username}:${credentials.password}:IKLAB005`)

			axios.post(`${BASE_URL_API}/api/login`, {
				auth: auth,
				privilegesDetail: true
			})
			.then(resp => {
				const user = {
					client: resp.data.client_id, 
					location: location_id, 
					macaddress: device_id, 
					username: resp.data.username, 
					email: resp.data.email
				}

				commit('setToken', resp.data.access_token)
				commit('setUser', user)

				router.push('/counter')
			})
			.catch(err => {
				console.log("error auth api : ", err)
			})
		},

		increment({state}){

			axios.post(`${BASE_URL_API}/ikcount/api/livecommand?atoken=${state.token}`,{
				type: "manual-add",  
				quantity: 1, 
				client: state.user.client, 
				location: state.user.location, 
				macaddress: state.user.macaddress, 
				username: state.user.username, 
				email: state.user.email
			},)
			.then((resp) => {
				console.log("resp", resp)
			})
			.catch((resp) => {
				console.log("error", resp)
			})
		},

		decrement({state}){
			axios.post(`${BASE_URL_API}/ikcount/api/livecommand?atoken=${state.token}`,{
				type: "manual-sub",  
				quantity: 1, 
				client: state.user.client, 
				location: state.user.location, 
				macaddress: state.user.macaddress, 
				username: state.user.username, 
				email: state.user.email
			},)
			.then((resp) => {
				console.log("resp", resp)
			})
			.catch((resp) => {
				console.log("error", resp)
			})
		},

		live({state}){

			const socket = io(`${BASE_URL_SIO}/token?atoken=${state.token}`);

			socket.on("connect", () => {  
				console.log("connect", socket.id) 
			});

			socket.on("disconnect", () => { 
				console.log("disconnect ", socket.id) 
			});
		}
	},

	modules: {},
});
