import boto3, csv, base64
from datetime import datetime

class AwsRekog:

	def __init__(self, u_id, img_data):

		with open('credentials.csv', 'r') as input:
			next(input)
			reader = csv.reader(input)
			for line in reader:
				self.access_key_id = line[2]
				self.secret_access_key = line[3]

		self.u_id = u_id
		self.date = datetime.now().strftime("%d_%b_%Y")
		self.image_data = img_data


	def compare(self):

		target = '{}_{}.jpeg'.format(self.u_id, self.date)
		source = 's3_{}.jpeg'.format(self.u_id)

		print(target)
		print(source)

		client = boto3.client('rekognition', 
			region_name='ap-south-1',
			aws_access_key_id = self.access_key_id,
			aws_secret_access_key = self.secret_access_key)

		with open(target, 'rb') as source_image:
			source_bytes = source_image.read()

		response = client.compare_faces(
    		SourceImage={
       	 			'Bytes': source_bytes
    					},
    		TargetImage={
        			'S3Object':{
            		'Bucket': 'mk203devw',
            		'Name': source
            
        						}
    					},
					)
		print(self.upload(target))
		return response

	def upload(self, target, object_name=None):


		s3_client = boto3.client('s3', region_name='ap-south-1',
			aws_access_key_id = self.access_key_id,
			aws_secret_access_key = self.secret_access_key)

		if object_name is None:
			object_name = target
		try:
			bucket = 'mk203devw'
			s3_client.upload_file(target, bucket, object_name)
			print("Write successful!")
		except Exception as e:
			print("exp:", e)
			return False
		return True

	def convert(self):

		filename = '{}_{}.jpeg'.format(self.u_id, self.date)
		with open(filename, 'wb') as file:
			file.write(base64.decodebytes(self.image_data))







