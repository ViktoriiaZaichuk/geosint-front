export const mockUser = {
    id: 1,
    username: "testuser",
    email: "testuser@example.com",
};
  
export const mockUserContextValue = {
    user: mockUser,
    dispatch: jest.fn(),
};


const MockUserProvider = ({ children }) => {
    const { user, dispatch } = mockUserContextValue;
    return (
      <UserContext.Provider value={{ user, dispatch }}>
        {children}
      </UserContext.Provider>
    );
};