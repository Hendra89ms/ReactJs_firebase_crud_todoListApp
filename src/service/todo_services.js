import { db } from '../firebase_config'
import { getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, doc, where, query, getCountFromServer } from 'firebase/firestore'

let todoCollectionRef = collection(db, 'todo')

export default class Todo_Services {

    static addTodo = (newTodo) => {
        return addDoc(todoCollectionRef, newTodo)
    }

    static getAllTodo = () => {
        return getDocs(todoCollectionRef)
    }

    static getTodo = (id) => {
        const todoDoc = doc(db, "todo", id)
        return getDoc(todoDoc)
    }

    static updateTodo = (id, updateData) => {
        const todoDoc = doc(db, "todo", id)
        return updateDoc(todoDoc, updateData)
    }

    static deleteTodo = (id) => {
        const todoDoc = doc(db, "todo", id)
        return deleteDoc(todoDoc)
    }

    static totalData = (userId) => {
        const q = query(todoCollectionRef, where("userId", "==", userId));
        return getCountFromServer(q)
    }

    static dataUser = (userId) => {
        const q = query(todoCollectionRef, where("userId", "==", userId));
        return getDocs(q)
    }


}