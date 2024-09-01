export class APIClientError extends Error {
    constructor(message: string = "", ...args: any) {
        super(message, ...args);
        this.message = message;
    }
}

const isResponseOK = (response: Response): boolean => {
    return response.status >= 200 && response.status < 300
}

const mapError = (response: Response) => {
    if (response.status === 500) {
        return new APIClientError("Something went wrong...")
    }
}

export const baseAPIClient = async <T, P>(resource: string, { method, payload }: { method: "POST", payload?: P }): Promise<T> => {
    switch (method) {
        case "POST":
            const response = await fetch(`http://localhost:8000/${resource}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (isResponseOK(response)) {
                const json = await response.json()
                return json
            }
            throw mapError(response)
    }
}