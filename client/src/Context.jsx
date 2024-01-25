import { createContext, useState } from "react"

export const userContext = createContext()


export const UserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState({
        createdAt: "2021-12-17T07:09:25.106Z",
        avatar: "https://cdn.fakercloud.com/avatars/laasli_128.jpg",
        Bio: "Magni placeat laboriosam reiciendis in officiis non nihil placeat.",
        jobTitle: "Dynamic Web Designer",
        profile: {
          username: "Xander.Hammes",
          firstName: "Marilyne",
          lastName: "Ruecker",
          email: "Micaela_Schoen@yahoo.com"
        },
        id: "0"
    })
    
    const updateUser = (newUser) => {
        setCurrUser(newUser)
    }

    const contextValue = {
        currUser,
        updateUser
    }

    return (
        <userContext.Provider value = {contextValue}>
            {children}
        </userContext.Provider>
    )

}




