class BaseScene extends BaseModule
{
    protected data:any;
    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.data = data;
        }
    }
}