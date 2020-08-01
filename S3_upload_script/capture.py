import cv2 
  
  
vid = cv2.VideoCapture(0) 

# constants
emp_id = 0
emp_str = "employee_"
SAVE = 99
QUIT = 113
  
while(True): 
    ret, frame = vid.read() 
    cv2.imshow('frame', frame)

    k = cv2.waitKey(1)

    if k == QUIT:
        break
    elif k == SAVE:
        print("hai")
        image_name = emp_str + "{}.jpeg".format(emp_id)
        cv2.imwrite(image_name, frame)
        print("{} saved!".format(image_name))
        emp_id += 1
        break
   
vid.release()  
cv2.destroyAllWindows()