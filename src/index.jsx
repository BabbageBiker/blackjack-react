"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const GameBoardComponents_1 = __importDefault(require("./components/GameBoardComponents"));
// interface MyListProps {
//     maxItems?: number;
//     children?: React.JSX.Element | React.JSX.Element[];
// }
// class MyListState {
//     nClicks : number = 0;
// }
// class MyList extends Component<MyListProps, MyListState> {
//     constructor(props: MyListProps) {
//         super(props);
//         this.state = new MyListState();
//         this.addClick = this.addClick.bind(this);
//     }
//     override render(): ReactNode {
//         const children = React.Children.toArray(this.props.children);
//         const result = []
//         const nChildren = this.props.maxItems ?? children.length;
//         for( let child = 0; child < Math.min(nChildren, children.length); child++ ) {
//             result.push( children[child] );
//         }
//         result.push( <li>You have clicked {this.state.nClicks} times.</li> );
//         return <ul onClick={this.addClick}>{result}</ul>
//     }
//     addClick(): void {
//         let newState = new MyListState();
//         newState.nClicks = this.state.nClicks + 1;
//         this.setState( newState );
//     }
// }
// class App extends Component {
//     override render(): ReactNode {
//         return <div>
//             <p>welcome to my web app.</p>
//             <MyList maxItems={2}>
//                 <li>one</li>
//                 <li>two</li>
//                 <li>three</li>
//             </MyList>
//         </div>
//     }
// }
const rootElem = document.getElementById('root');
if (rootElem == null) {
    // alert('you forgot to put a root element in your HTML file.');
    throw new Error('Root element was not found');
} // else {
const root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.default.StrictMode>
        <GameBoardComponents_1.default />
    </react_1.default.StrictMode>);
// }
