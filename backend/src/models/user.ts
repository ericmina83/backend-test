const users: Express.User[] = [
    { _id: 1, username: 'admin', password: '$2b$10$Km/z54B8hEgDVy0uy3j6qucBLYFa3PFNHo6l/U1rub4RPyD89qaMi' }, // '1234' encrypted by bcryce
    { _id: 2, username: 'user', password: '$2b$10$.DSsxhvpOi8nPwajJFCKTuT663yAtwMVLagYdTLWmAP.LGxPOEB2C' }  // '5678' encrypted by bcryce
]

export const findById = (id: number): Promise<Express.User> => {
    const user = users.find(user => user._id === id);
    return user ? Promise.resolve(user) : Promise.reject(null);
}

export const findOne = (name: string): Promise<Express.User> => {
    const user = users.find((user) => user.username === name);
    return user ? Promise.resolve(user) : Promise.reject(null);
}
