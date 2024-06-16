import { User } from "./types/types";

export interface ApiResponse {
  id: string;
  email: string;
}

export interface ApiError {
  message: string;
}

export const createUser = async (userdata: User): Promise<ApiResponse> => {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userdata),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || "error creating user");
  }

  const { email, id } = (await response.json()) as User;

  return { email, id };
};

export const loginUser = async (userdata: User): Promise<ApiResponse> => {
  const response = await fetch("http://localhost:5000/users");

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || "error creating user");
  }

  //if any user is found then check the password matched or not
  if (!userdata) {
    throw new Error("please provide your credentials !");
  }

  const users = (await response.json()) as User[];

  //check if our particular user exists or not
  const user = users.find((u) => {
    return u.email === userdata.email;
  });

  // if user doesnot exist throw an error

  if (!user) {
    throw new Error("You are not a valid user , please register first");
  }

  //if exist then check the password is matched or not

  const passwordMatched = user.password === userdata.password;

  if (!passwordMatched) {
    throw new Error("Invalid credentials");
  }

  // If matched the password than return the email

  return { email: user.email, id: user.id };
};
