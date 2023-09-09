import { FC, useState } from 'react';
import {
  Select,
  TextInput,
  Box,
  Flex,
  NumberInput,
  Textarea,
  Text,
  Grid,
  Button,
  CopyButton,
  Title,
  Table,
} from '@mantine/core';

import { useForm } from '@mantine/form';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import { log } from 'console';

const Home: FC = () => {
  const form = useForm({
    initialValues: {
      salary: 0,
      hours_per_week:0,
      days_per_week:0,
      holidays_per_year:0,
      vacation_per_year:0,
      dropdownOptions: 'Month',
    },
    // validate:{
    //   days_per_week:(value)=>{
    //     if(value>0 && value<168)
    //     {return true;}
    //     else{
    //       return "The weekly hours cannot surpass 168.";
    //     }
        
    //   },
    // }
   
   
  });
// ---------------------


// const initial_element_values = [
//   { name:"Hourly",unadjusted:0,adjusted:0 },
//   { name:"Daily",unadjusted:0,adjusted:0 },
//   { name:"Weekly",unadjusted:0,adjusted:0 },
//   { name:"Bi-weekly",unadjusted:0,adjusted:0 },
//   { name:"Semi-monthly",unadjusted:0,adjusted:0 },
//   { name:"Monthly",unadjusted:0,adjusted:0 },
//   { name:"Quarterly",unadjusted:0,adjusted:0 },
//   { name:"Annual",unadjusted:0,adjusted:0 },
// ];
const initial_element_values2 = {
  Hourly:{unadjusted:0,adjusted:0 },  
  Daily:{unadjusted:0,adjusted:0 },
  Weekly:{unadjusted:0,adjusted:0 },
  Bi_weekly:{unadjusted:0,adjusted:0 },
  Semi_monthly:{unadjusted:0,adjusted:0 },
  Monthly:{unadjusted:0,adjusted:0 },
  Quarterly:{unadjusted:0,adjusted:0 },
  Annual:{unadjusted:0,adjusted:0 },

};
const [tabel_rows,set_tabel_rows]=useState(initial_element_values2);

// const rows = tabel_rows.map((element) => (
//   <tr key={element.name}>
//     <td>{element.name}</td>
//     <td>{element.unadjusted}</td>
//     <td>{element.adjusted}</td>
//   </tr>
// ));
function fixed_fraction(digit:number,upto:number)
{
  // return Math.floor(+(digit.toFixed(upto)));
  return +(digit.toFixed(upto));
}

function showResult(data: {salary: number; hours_per_week: number; days_per_week: number; holidays_per_year: number; vacation_per_year: number; dropdownOptions: string; })
{

  if(!data.days_per_week || !data.dropdownOptions || !data.hours_per_week || !data.salary )
  {
        window.alert("Please, Fill All the Fields!")
        return false;
  }



  let annual_salary_adjusted:number=0;
  let annual_salary_unadj:number=0;
   
  let weekly_adj:number=0;
  let weekly_unadj:number=0;
  let bi_weekly_adj:number=0;
  let bi_weekly_unadj:number=0;

  let daily_adj:number=0;
  let daily_unadj:number=0;

  let hourly_adj:number=0;
  let hourly_unadj:number=0;

  let Semi_monthly_adj:number=0;
  let Semi_monthly_unadj:number=0;

  let monthly_adj:number=0;
  let monthly_unadj:number=0;

  let Quarterly_salary_adj:number =0;
  let Quarterly_salary_unadj:number =0;
   


  

  const annual_week = 52;
  const average_per_month_weeks = 4.33333728091;

   if(data.dropdownOptions==="Month")
   {
     const daily_working_hour = (data.hours_per_week/data.days_per_week);
     hourly_unadj = +(data.salary/(average_per_month_weeks*data.hours_per_week));
     daily_unadj = fixed_fraction(hourly_unadj*daily_working_hour,4);
     weekly_unadj = (fixed_fraction(daily_unadj*data.days_per_week,0));
     bi_weekly_unadj = fixed_fraction(weekly_unadj*2,0);

    //  annual_salary_unadj= fixed_fraction(hourly_unadj*daily_working_hour*(data.days_per_week*annual_week),0);
     annual_salary_unadj= fixed_fraction((data.salary*12),0);

     Quarterly_salary_unadj= fixed_fraction(annual_salary_unadj/4,0)
     monthly_unadj =fixed_fraction(annual_salary_unadj/12,0);   
     Semi_monthly_unadj =  fixed_fraction(monthly_unadj/2,0);


                      // adjusted salary code 

    annual_salary_adjusted= fixed_fraction(((annual_week*data.days_per_week-(data.holidays_per_year+data.vacation_per_year))*daily_unadj),0); //accurate 
    hourly_adj = +(annual_salary_adjusted/(annual_week*data.hours_per_week));


    daily_adj = +(hourly_adj*daily_working_hour);
    weekly_adj = (fixed_fraction(daily_adj*data.days_per_week,0));
    bi_weekly_adj = fixed_fraction(weekly_adj*2,0);


    Quarterly_salary_adj= fixed_fraction(annual_salary_adjusted/4,0)
    monthly_adj =fixed_fraction(annual_salary_adjusted/12,0);   
    Semi_monthly_adj =  fixed_fraction(monthly_adj/2,0);
   

    setTimeout(()=>{

    set_tabel_rows({...initial_element_values2,
      Annual:{adjusted:annual_salary_adjusted,unadjusted:annual_salary_unadj},
      Quarterly:{adjusted:Quarterly_salary_adj,unadjusted:Quarterly_salary_unadj},
      Semi_monthly:{adjusted:Semi_monthly_adj,unadjusted:Semi_monthly_unadj},
      Monthly:{adjusted:monthly_adj,unadjusted:monthly_unadj},
      Weekly:{adjusted:weekly_adj,unadjusted:weekly_unadj},
      Bi_weekly:{adjusted:bi_weekly_adj,unadjusted:bi_weekly_unadj},
      Daily:{adjusted:fixed_fraction(daily_adj,2),unadjusted:fixed_fraction(daily_unadj,2)},
      Hourly:{adjusted:fixed_fraction(hourly_adj,2),unadjusted:fixed_fraction(hourly_unadj,2)},
    
    });
  },300);

   }
   else if(data.dropdownOptions==="Hour")
   {
     const daily_working_hour = (data.hours_per_week/data.days_per_week);
     hourly_unadj = +(data.salary);
     daily_unadj = +(hourly_unadj*daily_working_hour);
     weekly_unadj = (fixed_fraction(daily_unadj*data.days_per_week,0));
     bi_weekly_unadj = fixed_fraction(weekly_unadj*2,0);

     annual_salary_unadj= fixed_fraction(data.salary*annual_week*data.days_per_week*daily_working_hour,0);

     Quarterly_salary_unadj= fixed_fraction(annual_salary_unadj/4,0)
     monthly_unadj =fixed_fraction(annual_salary_unadj/12,0);   
     Semi_monthly_unadj =  fixed_fraction(monthly_unadj/2,0);


                      // adjusted salary code 

    annual_salary_adjusted= fixed_fraction(((annual_week*data.days_per_week-(data.holidays_per_year+data.vacation_per_year))*daily_unadj),0);
    hourly_adj = +(annual_salary_adjusted/(annual_week*data.hours_per_week));

    daily_adj = +(hourly_adj*daily_working_hour);
    weekly_adj = (fixed_fraction(daily_adj*data.days_per_week,0));
    bi_weekly_adj = fixed_fraction(weekly_adj*2,0);


    Quarterly_salary_adj= fixed_fraction(annual_salary_adjusted/4,0)
    monthly_adj =fixed_fraction(annual_salary_adjusted/12,0);   
    Semi_monthly_adj =  fixed_fraction(monthly_adj/2,0);
   

    setTimeout(()=>{

    set_tabel_rows({...initial_element_values2,
      Annual:{adjusted:annual_salary_adjusted,unadjusted:annual_salary_unadj},
      Quarterly:{adjusted:Quarterly_salary_adj,unadjusted:Quarterly_salary_unadj},
      Semi_monthly:{adjusted:Semi_monthly_adj,unadjusted:Semi_monthly_unadj},
      Monthly:{adjusted:monthly_adj,unadjusted:monthly_unadj},
      Weekly:{adjusted:weekly_adj,unadjusted:weekly_unadj},
      Bi_weekly:{adjusted:bi_weekly_adj,unadjusted:bi_weekly_unadj},
      Daily:{adjusted:fixed_fraction(daily_adj,2),unadjusted:fixed_fraction(daily_unadj,2)},
      Hourly:{adjusted:fixed_fraction(hourly_adj,2),unadjusted:fixed_fraction(hourly_unadj,2)},
    
    });
  },300);

   }
   else if(data.dropdownOptions==="Day")
   {
     const daily_working_hour = (data.hours_per_week/data.days_per_week);
     hourly_unadj = +(data.salary/(daily_working_hour));
     daily_unadj = fixed_fraction(hourly_unadj*daily_working_hour,4);
     weekly_unadj = (fixed_fraction(daily_unadj*data.days_per_week,0));
     bi_weekly_unadj = fixed_fraction(weekly_unadj*2,0);

     annual_salary_unadj= fixed_fraction(hourly_unadj*daily_working_hour*(data.days_per_week*annual_week),0);

     Quarterly_salary_unadj= fixed_fraction(annual_salary_unadj/4,0)
     monthly_unadj =fixed_fraction(annual_salary_unadj/12,0);   
     Semi_monthly_unadj =  fixed_fraction(monthly_unadj/2,0);


                      // adjusted salary code 

    annual_salary_adjusted= fixed_fraction(((annual_week*data.days_per_week-(data.holidays_per_year+data.vacation_per_year))*daily_unadj),0); //accurate 
    hourly_adj = +(annual_salary_adjusted/(annual_week*data.hours_per_week));


    daily_adj = +(hourly_adj*daily_working_hour);
    weekly_adj = (fixed_fraction(daily_adj*data.days_per_week,0));
    bi_weekly_adj = fixed_fraction(weekly_adj*2,0);


    Quarterly_salary_adj= fixed_fraction(annual_salary_adjusted/4,0)
    monthly_adj =fixed_fraction(annual_salary_adjusted/12,0);   
    Semi_monthly_adj =  fixed_fraction(monthly_adj/2,0);
   

    setTimeout(()=>{

    set_tabel_rows({...initial_element_values2,
      Annual:{adjusted:annual_salary_adjusted,unadjusted:annual_salary_unadj},
      Quarterly:{adjusted:Quarterly_salary_adj,unadjusted:Quarterly_salary_unadj},
      Semi_monthly:{adjusted:Semi_monthly_adj,unadjusted:Semi_monthly_unadj},
      Monthly:{adjusted:monthly_adj,unadjusted:monthly_unadj},
      Weekly:{adjusted:weekly_adj,unadjusted:weekly_unadj},
      Bi_weekly:{adjusted:bi_weekly_adj,unadjusted:bi_weekly_unadj},
      Daily:{adjusted:fixed_fraction(daily_adj,2),unadjusted:fixed_fraction(daily_unadj,2)},
      Hourly:{adjusted:fixed_fraction(hourly_adj,2),unadjusted:fixed_fraction(hourly_unadj,2)},
    
    });
  },300);

   }
   else if(data.dropdownOptions==="Week")
   {
     const daily_working_hour = (data.hours_per_week/data.days_per_week);
     hourly_unadj = +(data.salary/data.hours_per_week);
     daily_unadj = +(hourly_unadj*daily_working_hour);
     weekly_unadj = (fixed_fraction(daily_unadj*data.days_per_week,0));
     bi_weekly_unadj = fixed_fraction(weekly_unadj*2,0);

     annual_salary_unadj= fixed_fraction(hourly_unadj*annual_week*data.days_per_week*daily_working_hour,0);

     Quarterly_salary_unadj= fixed_fraction(annual_salary_unadj/4,0)
     monthly_unadj =fixed_fraction(annual_salary_unadj/12,0);   
     Semi_monthly_unadj =  fixed_fraction(monthly_unadj/2,0);


                      // adjusted salary code 

    annual_salary_adjusted= fixed_fraction(((annual_week*data.days_per_week-(data.holidays_per_year+data.vacation_per_year))*daily_unadj),0);
    hourly_adj = +(annual_salary_adjusted/(annual_week*data.hours_per_week));

    daily_adj = +(hourly_adj*daily_working_hour);
    weekly_adj = (fixed_fraction(daily_adj*data.days_per_week,0));
    bi_weekly_adj = fixed_fraction(weekly_adj*2,0);


    Quarterly_salary_adj= fixed_fraction(annual_salary_adjusted/4,0)
    monthly_adj =fixed_fraction(annual_salary_adjusted/12,0);   
    Semi_monthly_adj =  fixed_fraction(monthly_adj/2,0);
   

    setTimeout(()=>{

    set_tabel_rows({...initial_element_values2,
      Annual:{adjusted:annual_salary_adjusted,unadjusted:annual_salary_unadj},
      Quarterly:{adjusted:Quarterly_salary_adj,unadjusted:Quarterly_salary_unadj},
      Semi_monthly:{adjusted:Semi_monthly_adj,unadjusted:Semi_monthly_unadj},
      Monthly:{adjusted:monthly_adj,unadjusted:monthly_unadj},
      Weekly:{adjusted:weekly_adj,unadjusted:weekly_unadj},
      Bi_weekly:{adjusted:bi_weekly_adj,unadjusted:bi_weekly_unadj},
      Daily:{adjusted:fixed_fraction(daily_adj,2),unadjusted:fixed_fraction(daily_unadj,2)},
      Hourly:{adjusted:fixed_fraction(hourly_adj,2),unadjusted:fixed_fraction(hourly_unadj,2)},
    
    });
  },300);

   }
   else if(data.dropdownOptions==="Year")
   {
     const daily_working_hour = (data.hours_per_week/data.days_per_week);
     hourly_unadj = +(data.salary/(annual_week*daily_working_hour*data.days_per_week));
     daily_unadj = +(hourly_unadj*daily_working_hour);
     weekly_unadj = (fixed_fraction(daily_unadj*data.days_per_week,0));
     bi_weekly_unadj = fixed_fraction(weekly_unadj*2,0);

     annual_salary_unadj= fixed_fraction(hourly_unadj*annual_week*data.days_per_week*daily_working_hour,0);

     Quarterly_salary_unadj= fixed_fraction(annual_salary_unadj/4,0)
     monthly_unadj =fixed_fraction(annual_salary_unadj/12,0);   
     Semi_monthly_unadj =  fixed_fraction(monthly_unadj/2,0);


                      // adjusted salary code 

    annual_salary_adjusted= fixed_fraction(((annual_week*data.days_per_week-(data.holidays_per_year+data.vacation_per_year))*daily_unadj),0);
    hourly_adj = +(annual_salary_adjusted/(annual_week*data.hours_per_week));

    daily_adj = +(hourly_adj*daily_working_hour);
    weekly_adj = (fixed_fraction(daily_adj*data.days_per_week,0));
    bi_weekly_adj = fixed_fraction(weekly_adj*2,0);


    Quarterly_salary_adj= fixed_fraction(annual_salary_adjusted/4,0)
    monthly_adj =fixed_fraction(annual_salary_adjusted/12,0);   
    Semi_monthly_adj =  fixed_fraction(monthly_adj/2,0);
   

    setTimeout(()=>{

    set_tabel_rows({...initial_element_values2,
      Annual:{adjusted:annual_salary_adjusted,unadjusted:annual_salary_unadj},
      Quarterly:{adjusted:Quarterly_salary_adj,unadjusted:Quarterly_salary_unadj},
      Semi_monthly:{adjusted:Semi_monthly_adj,unadjusted:Semi_monthly_unadj},
      Monthly:{adjusted:monthly_adj,unadjusted:monthly_unadj},
      Weekly:{adjusted:weekly_adj,unadjusted:weekly_unadj},
      Bi_weekly:{adjusted:bi_weekly_adj,unadjusted:bi_weekly_unadj},
      Daily:{adjusted:fixed_fraction(daily_adj,2),unadjusted:fixed_fraction(daily_unadj,2)},
      Hourly:{adjusted:fixed_fraction(hourly_adj,2),unadjusted:fixed_fraction(hourly_unadj,2)},
    
    });
  },300);

   }
   
}

  return (
    
    <Grid h={'100%'} m={0}>
      <Grid.Col
        sx={(theme) => ({
          boxShadow: theme.shadows.md,
          backgroundColor: '#FDFDFD',
          borderRight: '1px solid',
          borderColor: '#D9D9D9',
        })}
        sm={6}
      >
        <Box py={24} px={'16px'} w={{ base: '100%' }}>
        <Title mb={24} order={1}>Salary Calculator</Title>

          <form onSubmit={form.onSubmit((values) => showResult(values))}>
           

          {/* <NumberInput
              w="100%"
              mb={'24px'}
              min={1}
             
              placeholder='Salary'
              label="Salary Amount"
              {...form.getInputProps('salary')}
            /> */}
 <NumberInput
       w="100%"
       mb={'24px'}
       min={1}
      
       placeholder='Salary'
       label="Salary Amount"
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      {...form.getInputProps('salary')}
      precision={2}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value))
          ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          : '$ '
      }
    />

            <Select
              w="100%"
             
              data={['Hour', 'Day', 'Week',"Month","Year"]}
              placeholder="Month"
              mb={'24px'}
              label="Per"
              {...form.getInputProps('dropdownOptions')}
            />


            <NumberInput
              w="100%"
              mb={'24px'}
              min={1}
              label="Hours per week"
              {...form.getInputProps('hours_per_week')}
            />

            <NumberInput
              w="100%"
              mb={'24px'}
              min={1}
              label="Days per week"
              {...form.getInputProps('days_per_week')}
            />

            <NumberInput
              w="100%"
              mb={'24px'}
              min={1}
              label="Holidays per year"
              {...form.getInputProps('holidays_per_year')}
            />
            <NumberInput
              w="100%"
              mb={'24px'}
              min={1}
              label="Vacation Days per year"
              {...form.getInputProps('vacation_per_year')}
            />


           


            <Flex justify="flex-end">
              <Button
                disabled={!form.isValid()}
                size="md"
                color="violet"
                type="submit"
              >
                <Text>Get Result</Text>
              </Button>
            </Flex>
          </form>
        </Box>
      </Grid.Col>
      <Grid.Col sm={6}>
        <Box p="20px">
          <Flex mt="0px" direction="column" justify="flex-start" align="center">
            
           <Title mt="20px" order={2}>Salary Conclusion</Title>


<Box component='div'
 
  my={"20px"}
 sx={(theme) => ({
  display: 'block',
  width:"100%",
  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
  textAlign: 'center',
  padding: theme.spacing.xl,
  borderRadius: theme.radius.md,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
  },
})}
>

           <Table>
      <thead>
        <tr>
          <th></th>
           <Box component="th" sx={(theme) => ({textAlign:"right"})}>Unadjusted</Box>
         
           <Box component="th" sx={(theme) => ({textAlign:"right"})}>Holidays & vacation days adjusted</Box>
        </tr>
      </thead>
      <tbody>
       {/* ----------------------  */}
       <tr>

      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Hourly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Hourly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Hourly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
       {/* ----------------------  */}
       <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Daily</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Daily.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Daily.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
       {/* ----------------------  */}
       <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Weekly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Weekly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td"  sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Weekly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
       {/* ----------------------  */}
       <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Bi-Weekly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Bi_weekly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Bi_weekly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
         {/* ----------------------  */}
         <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Semi-Monthly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Semi_monthly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Semi_monthly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
         <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Monthly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Monthly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Monthly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
       {/* ----------------------  */}
         <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Quarterly</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Quarterly.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Quarterly.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}
       {/* ----------------------  */}
         <tr>
      <Box component="td" sx={(theme) => ({textAlign:"left"})}>Annual</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Annual.unadjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
    <Box component="td" sx={(theme) => ({textAlign:"right"})}>${tabel_rows.Annual.adjusted.toLocaleString(undefined, {maximumFractionDigits:2})}</Box>
       </tr>
       {/* ----------------------  */}

      </tbody>
    </Table>

</Box>

          </Flex>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default Home;
