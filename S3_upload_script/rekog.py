import boto3
import csv

with open('credentials.csv', 'r') as input:
	next(input)
	reader = csv.reader(input)
	for line in reader:
		access_key_id = line[2]
		secret_access_key = line[3]


emp_id = 0 # from capture
# photo = 'employee_{}.jpeg'.format(emp_id)
photo = 'test.jpeg'
val = 's3_employee_{}.jpeg'.format(emp_id)

client = boto3.client('rekognition', 
			region_name='us-east-2',
			aws_access_key_id = access_key_id,
			aws_secret_access_key = secret_access_key)

with open(photo, 'rb') as source_image:
	source_bytes = source_image.read()

response = client.compare_faces(
    SourceImage={
        'Bytes': source_bytes
    },
    TargetImage={
        'S3Object':{
            'Bucket': 'mk203devwar',
            'Name': val
            
        }
    },
)


for key, values in response.items():
	if key in ('FaceMatches', 'UnmatchedFaces'):
		print(key)
		for attr in values:
			print(attr)