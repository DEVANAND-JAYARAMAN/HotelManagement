import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Scanner;

class Food implements Serializable
{
    int itemno;
    int quantity;   
    float price;
    
    Food(int itemno,int quantity)
    {
        this.itemno=itemno;
        this.quantity=quantity;
        switch(itemno)
        {
            case 1:price=quantity*50;
                break;
            case 2:price=quantity*60;
                break;
            case 3:price=quantity*70;
                break;
            case 4:price=quantity*30;
                break;
        }
    }
}

class Singleroom implements Serializable
{
    String name;
    String contact;
    String gender;   
    ArrayList<Food> food =new ArrayList<>();

    Singleroom()
    {
        this.name="";
    }

    Singleroom(String name,String contact,String gender)
    {
        this.name=name;
        this.contact=contact;
        this.gender=gender;
    }
}

class Doubleroom extends Singleroom implements Serializable
{ 
    String name2;
    String contact2;
    String gender2;  
    
    Doubleroom()
    {
        this.name="";
        this.name2="";
    }

    Doubleroom(String name,String contact,String gender,String name2,String contact2,String gender2)
    {
        this.name=name;
        this.contact=contact;
        this.gender=gender;
        this.name2=name2;
        this.contact2=contact2;
        this.gender2=gender2;
    }
}

class NotAvailable extends Exception
{
    @Override
    public String toString()
    {
        return "Not Available !";
    }
}

class holder implements Serializable
{
    Doubleroom luxury_doublerrom[]=new Doubleroom[10]; //Luxury
    Doubleroom deluxe_doublerrom[]=new Doubleroom[20]; //Deluxe
    Singleroom luxury_singleerrom[]=new Singleroom[10]; //Luxury
    Singleroom deluxe_singleerrom[]=new Singleroom[20]; //Deluxe
}

class HotelManagement
{
    static holder hotel_ob=new holder();
    static Scanner sc = new Scanner(System.in);

    static void CustDetails(int i,int rn)
    {
        String name, contact, gender;
        String name2 = null, contact2 = null; 
        String gender2="";
        System.out.print("\nEnter customer name: ");
        name = sc.next();
        System.out.print("Enter contact number: ");
        contact=sc.next();
        System.out.print("Enter gender: ");
        gender = sc.next();
        if(i<3)
        {
        System.out.print("Enter second customer name: ");
        name2 = sc.next();
        System.out.print("Enter contact number: ");
        contact2=sc.next();
        System.out.print("Enter gender: ");
        gender2 = sc.next();
        }      
        
          switch (i) {
            case 1:hotel_ob.luxury_doublerrom[rn]=new Doubleroom(name,contact,gender,name2,contact2,gender2);
                break;
            case 2:hotel_ob.deluxe_doublerrom[rn]=new Doubleroom(name,contact,gender,name2,contact2,gender2);
                break;
            case 3:hotel_ob.luxury_singleerrom[rn]=new Singleroom(name,contact,gender);
                break;
            case 4:hotel_ob.deluxe_singleerrom[rn]=new Singleroom(name,contact,gender);
                break;
            default:System.out.println("Wrong option");
                break;
        }
    }
    
    static void bookroom(int i)
    {
        int j;
        int rn;
        System.out.println("\nChoose room number from : ");
        switch (i) {
            case 1:
                for(j=0;j<hotel_ob.luxury_doublerrom.length;j++)
                {
                    if(hotel_ob.luxury_doublerrom[j]==null)
                    {
                        System.out.print(j+1+",");

                    }
                }
                System.out.print("\nEnter room number: ");
                try{
                rn=sc.nextInt();
                rn--;
                if(hotel_ob.luxury_doublerrom[rn]!=null)
                    throw new NotAvailable();
                CustDetails(i,rn);
                }
                catch(Exception e)
                {
                    System.out.println("Invalid Option");
                    return;
                }
                break;
            case 2:
                 for(j=0;j<hotel_ob.deluxe_doublerrom.length;j++)
                {
                    if(hotel_ob.deluxe_doublerrom[j]==null)
                    {
                        System.out.print(j+11+",");

                    }
                }
                System.out.print("\nEnter room number: ");
                try{
                rn=sc.nextInt();
                rn=rn-11;
                if(hotel_ob.deluxe_doublerrom[rn]!=null)
                    throw new NotAvailable();
                CustDetails(i,rn);
                }
                catch(Exception e)
                {
                    System.out.println("Invalid Option");
                    return;
                }
                break;
            case 3:
                  for(j=0;j<hotel_ob.luxury_singleerrom.length;j++)
                {
                    if(hotel_ob.luxury_singleerrom[j]==null)
                    {
                        System.out.print(j+31+",");

                    }
                }
                System.out.print("\nEnter room number: ");
                try{
                rn=sc.nextInt();
                rn=rn-31;
                if(hotel_ob.luxury_singleerrom[rn]!=null)
                    throw new NotAvailable();
                CustDetails(i,rn);
                }
                catch(Exception e)
                {
                    System.out.println("Invalid Option");
                    return;
                }
                break;
            case 4:
                  for(j=0;j<hotel_ob.deluxe_singleerrom.length;j++)
                {
                    if(hotel_ob.deluxe_singleerrom[j]==null)
                    {
                        System.out.print(j+41+",");

                    }
                }
                System.out.print("\nEnter room number: ");
                try{
                rn=sc.nextInt();
                rn=rn-41;
                if(hotel_ob.deluxe_singleerrom[rn]!=null)
                    throw new NotAvailable();
                CustDetails(i,rn);
                }
                catch(Exception e)
                {
                   System.out.println("Invalid Option");
                    return;
                }
                break;
            default:
                System.out.println("Enter valid option");
                break;
        }
        System.out.println("Room Booked");
    }
    
    static void features(int i)
    {
        switch (i) {
            case 1:System.out.println("Number of double beds : 1\nAC : Yes\nFree breakfast : Yes\nCharge per day:4000 ");
                break;
            case 2:System.out.println("Number of double beds : 1\nAC : No\nFree breakfast : Yes\nCharge per day:3000  ");
                break;
            case 3:System.out.println("Number of single beds : 1\nAC : Yes\nFree breakfast : Yes\nCharge per day:2200  ");
                break;
            case 4:System.out.println("Number of single beds : 1\nAC : No\nFree breakfast : Yes\nCharge per day:1200 ");
                break;
            default:
                System.out.println("Enter valid option");
                break;
        }
    }
    
    static void availability(int i)
    {
      int j,count=0;
        switch (i) {
            case 1:
                for(j=0;j<10;j++)
                {
                    if(hotel_ob.luxury_doublerrom[j]==null)
                        count++;
                }
                break;
            case 2:
                for(j=0;j<hotel_ob.deluxe_doublerrom.length;j++)
                {
                    if(hotel_ob.deluxe_doublerrom[j]==null)
                        count++;
                }
                break;
            case 3:
                for(j=0;j<hotel_ob.luxury_singleerrom.length;j++)
                {
                    if(hotel_ob.luxury_singleerrom[j]==null)
                        count++;
                }
                break;
            case 4:
                for(j=0;j<hotel_ob.deluxe_singleerrom.length;j++)
                {
                    if(hotel_ob.deluxe_singleerrom[j]==null)
                        count++;
                }
                break;
            default:
                System.out.println("Enter valid option");
                break;
        }
        System.out.println("Number of rooms available : "+count);
    }
    
    static void bill(int rn,int rtype)
    {
        double amount=0;
        String list[]={"Sandwich","Pasta","Noodles","Coke"};
        System.out.println("\n*******");
        System.out.println(" Bill:-");
        System.out.println("*******");
               

        switch(rtype)
        {
            case 1:
                amount+=4000;
                    System.out.println("\nRoom Charge - "+4000);
                    System.out.println("\n===============");
                    System.out.println("Food Charges:- ");
                    System.out.println("===============");
                     System.out.println("Item   Quantity    Price");
                    System.out.println("-------------------------");
                    for(Food obb:hotel_ob.luxury_doublerrom[rn].food)
                    {
                        System.out.println(list[obb.itemno-1]+"   "+obb.quantity+"   "+obb.price);
                        amount+=obb.price;
                    }
                break;
            case 2:
                amount+=3000;
                    System.out.println("\nRoom Charge - "+3000);
                    System.out.println("\n===============");
                    System.out.println("Food Charges:- ");
                    System.out.println("===============");
                     System.out.println("Item   Quantity    Price");
                    System.out.println("-------------------------");
                    for(Food obb:hotel_ob.deluxe_doublerrom[rn].food)
                    {
                        System.out.println(list[obb.itemno-1]+"   "+obb.quantity+"   "+obb.price);
                        amount+=obb.price;
                    }
                break;
            case 3:
                amount+=2200;
                    System.out.println("\nRoom Charge - "+2200);
                    System.out.println("\n===============");
                    System.out.println("Food Charges:- ");
                    System.out.println("===============");
                     System.out.println("Item   Quantity    Price");
                    System.out.println("-------------------------");
                    for(Food obb:hotel_ob.luxury_singleerrom[rn].food)
                    {
                        System.out.println(list[obb.itemno-1]+"   "+obb.quantity+"   "+obb.price);
                        amount+=obb.price;
                    }
                break;
            case 4:
                amount+=1200;
                    System.out.println("\nRoom Charge - "+1200);
                    System.out.println("\n===============");
                    System.out.println("Food Charges:- ");
                    System.out.println("===============");
                     System.out.println("Item   Quantity    Price");
                    System.out.println("-------------------------");
                    for(Food obb:hotel_ob.deluxe_singleerrom[rn].food)
                    {
                        System.out.println(list[obb.itemno-1]+"   "+obb.quantity+"   "+obb.price);
                        amount+=obb.price;
                    }
                break;
            default:System.out.println("Invalid option");
                break;
        }
        System.out.println("Total Amount: "+amount);
    }
    
    static void addfood(int i,int rn)
    {
        int choice,q;
        System.out.println("\nAvailable Food Items:-");
        System.out.println("\n1. Sandwich");
        System.out.println("2. Pasta");
        System.out.println("3. Noodles");
        System.out.println("4. Coke");
        System.out.println("Enter food item number: ");
        try{
        choice = sc.nextInt();
        if(choice>4 || choice<1)
            throw new Exception();
        }
        catch(Exception e)
        {
            System.out.println("Wrong Option");
            return;
        }
        System.out.print("Enter quantity: ");
        q=sc.nextInt();
        Food temp=new Food(choice,q);
        switch(i)
        {
            case 1:
                hotel_ob.luxury_doublerrom[rn].food.add(temp);
                break;
            case 2:
                hotel_ob.deluxe_doublerrom[rn].food.add(temp);
                break;
            case 3:
                hotel_ob.luxury_singleerrom[rn].food.add(temp);
                break;
            case 4:
                hotel_ob.deluxe_singleerrom[rn].food.add(temp);
                break;
            default:System.out.println("Wrong option");
                break;
        }
        System.out.println("Food added");
    }
    
    public static void main(String args[]) 
    {
        int ch,ch1,rn;
        try {
            do {
                System.out.println("\nWelcome to the Hotel Management System");
                System.out.println("\n1. Room Booking");
                System.out.println("2. Check Room Availability");
                System.out.println("3. Add Food");
                System.out.println("4. Generate Bill");
                System.out.println("5. Exit");
                System.out.print("\nEnter your choice: ");
                ch = sc.nextInt();

                switch(ch)
                {
                    case 1:
                        System.out.println("\nEnter the type of room you want to book: ");
                        System.out.println("1. Luxury Double Room");
                        System.out.println("2. Deluxe Double Room");
                        System.out.println("3. Luxury Single Room");
                        System.out.println("4. Deluxe Single Room");
                        System.out.print("\nEnter choice: ");
                        ch1 = sc.nextInt();
                        bookroom(ch1);
                        break;
                    case 2:
                        System.out.println("\nEnter the type of room you want to check: ");
                        System.out.println("1. Luxury Double Room");
                        System.out.println("2. Deluxe Double Room");
                        System.out.println("3. Luxury Single Room");
                        System.out.println("4. Deluxe Single Room");
                        System.out.print("\nEnter choice: ");
                        ch1 = sc.nextInt();
                        availability(ch1);
                        break;
                    case 3:
                        System.out.println("\nEnter the type of room: ");
                        System.out.println("1. Luxury Double Room");
                        System.out.println("2. Deluxe Double Room");
                        System.out.println("3. Luxury Single Room");
                        System.out.println("4. Deluxe Single Room");
                        System.out.print("\nEnter choice: ");
                        ch1 = sc.nextInt();
                        System.out.print("\nEnter room number: ");
                        rn = sc.nextInt();
                        rn--;
                        addfood(ch1,rn);
                        break;
                    case 4:
                        System.out.println("\nEnter the type of room: ");
                        System.out.println("1. Luxury Double Room");
                        System.out.println("2. Deluxe Double Room");
                        System.out.println("3. Luxury Single Room");
                        System.out.println("4. Deluxe Single Room");
                        System.out.print("\nEnter choice: ");
                        ch1 = sc.nextInt();
                        System.out.print("\nEnter room number: ");
                        rn = sc.nextInt();
                        rn--;
                        bill(rn,ch1);
                        break;
                    case 5:
                        System.out.println("Thank you for using the system!");
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                }
            } while(ch != 5);
        }
        catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
