from datetime import datetime

def main():
    start_time = "05:32"
    end_time = "06:15"
    bench_time = 40

    time_between = get_time_between(start_time,end_time)
    print(f"The bench took {round(time_between)} minutes to complete. Productivity was {calculate_productivity(time_between,bench_time)}%.")

def get_time_between(start_time, end_time):
    "Finds the time between start and end time in minutes"
    t_format = "%H:%M"
    time_start = datetime.strptime(start_time,t_format)
    time_end = datetime.strptime(end_time, t_format)

    time_between = (time_end - time_start).seconds/60
    return time_between

def calculate_productivity(time_taken,bench_time):
    "Caluclutes productivity rounded to nearest whole number"
    prod = bench_time/time_taken*100
    return round(prod)

main()
