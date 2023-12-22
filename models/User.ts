class User {
    userId: string;
    username: string;
    credits: number;
    email: string;
    subscription_plan: string;

    constructor(userId: string, username: string, credits: number, email: string, subscription_plan: string) {
        this.userId = userId;
        this.username = username;
        this.credits = credits;
        this.email = email;
        this.subscription_plan = subscription_plan;
    }

    static fromObject(obj: {user_id: string, username: string, credits: number, email: string, subscription_plan: string, google_id: string}): User {
        return new User(obj.user_id, obj.username, obj.credits, obj.email, obj.subscription_plan);
    }
}

export default User;
