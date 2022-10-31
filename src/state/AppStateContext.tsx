import {
	createContext,
	FC,
	useContext
} from "react" 

//  Task will become a card. Card is a component.
//  Task means talking about the data
type Task = { 
	id: string, 
	text: string 
} 

//  List will become a column
type List = { 
	id: string, 
	text: string, 
	tasks: Task[] 
}

export type AppState = { 
	lists: List[] 
} 

const appData: AppState = {  
	lists: [ 
		{ 
			id: "0", 
			text: "To Do", 
			tasks: [{ id: "c0", text: "Generate app scaffold" }] 
		}, 
		{ 
			id: "1", 
			text: "In Progress", 
			tasks: [{ id: "c2", text: "Learn Typescript" }] 
		}, 
		{ 
			id: "2", 
			text: "Done", 
			tasks: [{ id: "c3", text: "Begin to use static typing" }] 
		} 
	] 
} 

type AppStateContextProps = { 
	lists: List[] 
	getTasksByListId(id: string): Task[] 
} 

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps) 

//  type AppStateProviderProps = {
//  	children: React.
//  }

export const AppStateProvider: FC = ({ children }: any) => { 
	const { lists } = appData 
	
	const getTasksByListId = (id: string) => { 
		return lists.find((list) => list.id === id)?.tasks || [] 
	} 

	return ( 
		<AppStateContext.Provider value={{ lists, getTasksByListId }}> 
			{children} 
		</AppStateContext.Provider> 
	)
}

export const useAppState = () => {
	return useContext(AppStateContext)
}