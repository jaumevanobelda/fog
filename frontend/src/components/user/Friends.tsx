import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserIcon, UserPlusIcon } from "lucide-react"
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import { useFriendRequests } from "@/queries/auth/useUser";

export function Friends() {
    const { data: friendRequests } = useFriendRequests();

    return (
        <Tabs defaultValue="friendlist" className="w-full">
            <div className="border-b border-gray-700/50 p-3 pb-0">
                <TabsList className="w-full grid grid-cols-2 bg-transparent h-auto p-0 gap-2">
                    <TabsTrigger 
                        value="friendlist"
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-t-md border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-400 bg-transparent text-gray-400 hover:text-white transition-all"
                    >
                        <UserIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Amigos</span>
                    </TabsTrigger>
                    <TabsTrigger 
                        value="friendRequest"
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-t-md border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-400 bg-transparent text-gray-400 hover:text-white transition-all relative"
                    >
                        <UserPlusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Solicitudes</span>
                        {(friendRequests?.length || 0)  > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {friendRequests?.length}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="friendlist" className="m-0 p-3 max-h-[300px] overflow-y-auto">
                <FriendList />
            </TabsContent>
            
            <TabsContent value="friendRequest" className="m-0 p-3 max-h-[300px] overflow-y-auto">
                <FriendRequests />
            </TabsContent>
        </Tabs>
    )
}
