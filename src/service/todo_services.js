import { db } from '../firebase_config'
import { getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, doc } from 'firebase/firestore'

let todoCollectionRef = collection(db, 'todo')

export default class Todo_Services {

    static addTodo = (newTodo) => {
        return addDoc(todoCollectionRef, newTodo)
    }

    static getAllTodo = () => {
        return getDocs(todoCollectionRef)
    }

    static getTodo = (id) => {
        const bookDoc = doc(db, "todo", id)
        return getDoc(bookDoc)
    }

    static updateTodo = (id, updateData) => {
        const todoDoc = doc(db, "todo", id)
        return updateDoc(todoDoc, updateData)
    }

    static deleteTodo = (id) => {
        const todoDoc = doc(db, "todo", id)
        return deleteDoc(todoDoc)
    }


}