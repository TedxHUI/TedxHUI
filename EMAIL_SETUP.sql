-- 1. Enable the pg_net extension to allow HTTP requests from SQL
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Create the function that sends the email
CREATE OR REPLACE FUNCTION send_email_via_resend()
RETURNS TRIGGER AS $$
BEGIN
  -- We call the Resend API directly from the database
  PERFORM
    net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer re_dtBzjZhR_G8ZmJuPcNShiG5KNQ9gAfUFa'
      ),
      body := jsonb_build_object(
        'from', 'onboarding@resend.dev',
        'to', ARRAY[NEW.user_email],
        'subject', NEW.subject,
        'html', NEW.content
      )
    );
  
  -- Update the status to 'sent' (or you could handle errors if needed)
  -- For now, we assume it's queued successfully by pg_net
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create the trigger to run whenever a new notification is added
DROP TRIGGER IF EXISTS on_notification_inserted ON notifications;
CREATE TRIGGER on_notification_inserted
  AFTER INSERT ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_via_resend();
