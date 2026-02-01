export const OrgJoin = () => {
    //TODO: login checks when thats implemented 

    return (<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <h1>Streamline</h1>
            <div className="org_join_page_wrapper h-full sm:h-1/2 w-full sm:w-3/4 flex justify-start rounded-xl flex-col">

                <form className="w-full h-full mt-5 flex flex-col">

                    <div className="form_group flex flex-col sm:flex-row justify-center p-1">
                        <label className="sm:self-center self-start text-xl" htmlFor="org_join_code">Org/Club join code:</label>
                        <input type="text" id="org_join_code" className="form_input rounded-xl p-1" name="org_join_code"></input>
                    </div>

                    <div className="form_group w-full mt-10 flex justify-center">
                        <button type="submit" className="form_submit_button w-fit">
                            Join Org
                        </button>
                    </div>

                </form>
            
            </div>
        </div>
    </>)
}