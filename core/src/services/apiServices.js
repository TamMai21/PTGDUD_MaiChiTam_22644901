import axios from '../config/customizeAxios'

const postCreateNewUser = (dataInput) => {
    const data = new FormData()
    data.append('email', dataInput.email)
    data.append('password', dataInput.password)
    data.append('username', dataInput.username)
    data.append('role', dataInput.role)
    data.append('userImage', dataInput.image)

    return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const getAllUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const putUpdateNewUser = (dataInput) => {
    const data = new FormData()
    data.append('id', dataInput.id)
    data.append('username', dataInput.username)
    data.append('role', dataInput.role)
    data.append('userImage', dataInput.image)

    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 4000 })
}

const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}

const getQuizData = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}

const postCreateQuiz = (dataQuiz) => {
    const data = new FormData()
    data.append('description', dataQuiz.description)
    data.append('name', dataQuiz.name)
    data.append('difficulty', dataQuiz.difficulty)
    data.append('quizImage', dataQuiz.image)
    return axios.post(`api/v1/quiz`, data)
}

const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`)
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

const deleteQuizForAdmin = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`);
}

const postCreateNewQuestionForQuiz = (id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description,
        correct_answer,
        question_id
    });
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateNewUser,
    deleteUser,
    getAllUsersWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getQuizData,
    postSubmitQuiz, postCreateQuiz, getAllQuiz, putUpdateQuizForAdmin, deleteQuizForAdmin,
    postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion
}