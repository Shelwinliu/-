import { createUser } from '../../api/my.js'
import { loginUser } from '@/api/login.js'
import { setToken, setCache, getCache } from '@/utils/auth.js'

const state = {
	id: null,
	openid: '',
	nickName: '',
	gender: '',
	avatarUrl: ''
}

const mutations = {
	SET_ID: (state, id) => {
		state.id = id
	},
	SET_OPENID: (state, openid) => {
		state.openid = openid
	},
	SET_NICK_NAME: (state, nickName) => {
		state.nickName = nickName
	},
	SET_GENDER: (state, gender) => {
		state.gender = gender
	},
	SET_AVATAR_URL: (state, avatarUrl) => {
		state.avatarUrl = avatarUrl
	}
}

const actions = {
	// 用户登录
	login({ commit }, user) {
		// console.log(user)
		// const { name, password } = user
		return new Promise((resolve, res) => {
			loginUser(user).then(res => {
				const { id, name, token} = res.data
				commit('SET_ID', id)
				commit('SET_NICK_NAME', name)
				setToken(token)
				setCache('user', {id, name})
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
		// const { userInfo, openid } = user
		// return new Promise((resolve, reject) => {
		// 	createUser(user).then(res => {
		// 		const { id } = res.data.user
		// 		console.log(id)
		// 		commit('SET_ID', id)
		// 		commit('SET_OPENID', openid)
		// 		const { nickName, gender, avatarUrl } = userInfo
		// 		commit('SET_NICK_NAME', nickName)
		// 		commit('SET_GENDER', gender)
		// 		commit('SET_AVATAR_URL', avatarUrl)
		// 		resolve(res)
		// 	}).catch(error => {
		// 		reject(error)
		// 	})
		// })
	},
	loadUserInfo({ commit }) {
		const info = getCache('user')
		if(info) {
			const { id, name } = info
			commit('SET_ID', id)
			commit('SET_NICK_NAME', name)
		} 
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}