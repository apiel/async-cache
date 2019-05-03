import Vue from 'vue';

class Store {
    public state: any = {
        //   numbers: [1, 2, 3]
        responses: {
            a:  { name: 'api', args: [ '/counter' ], response: null },
            b:  { name: 'api', args: [ '/counter' ], response: null },
            c:  { name: 'api', args: [ '/counter' ], response: null },
        },
    };

    public addNumber() {
        //   this.state.numbers.push(newNumber);
        setTimeout(() => {
            // const responses = this.state.responses;
            // responses.e = 4;
            // Vue.set(responses, 'f', 5);
            // this.state = { ...this.state, responses };

            // work
            // this.state.responses = {
            //     ...this.state.responses,
            //     yo: { name: 'api', args: [ '/counter' ], response: 8 },
            // };

            const id = 'b';
            const responses = this.state.responses;
            responses[id] = { name: 'api', args: [ '/yo' ], response: 8 };
            this.state.responses = {
                ...this.state.responses,
                ...responses,
            };
        }, 100);
    }
}

export const store = new Store();